import express from "express";
import * as bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import { StatusCodes } from "http-status-codes";

import { Service } from "../service.core";
import { Context } from "../context.core";
import { Logger } from "../logger/logger.service";

const ROUTES_KEY = "ROUTES";
const PORT_KEY = "PORT";
const HOST_KEY = "HOST";

export interface RequestExtended extends express.Request {
  context?: Context
  service?: ExpressServer
}

interface BaseResponse {
  error?: any
  data?: any
  code?: number
  message?: string
  success: boolean
}

interface ExpressServerConfiguration {
  port: number,
  host: string
}

/** Service to stylize the log output */
export class ExpressServer extends Service {
  server: express.Express
  private instanceServer: any

  constructor(config: ExpressServerConfiguration, routes: express.Router[], context: Context) {
    let map = new Map();
    map.set(ROUTES_KEY, routes);
    map.set(PORT_KEY, config.port);
    map.set(HOST_KEY, config.host);
    super(map, context);
    this.server = express();
  }

  async beforeMount() {
    this.server.disable('x-powered-by');
    this.server.use(bodyParser.json() as express.RequestHandler);
    this.server.use(bodyParser.urlencoded({extended: true}) as express.RequestHandler);
    this.server.use(helmet());
    this.server.use(cors());
  }

  async onMount() {
    // set service parameter on request
    this.server.use((req: RequestExtended, _res: express.Response, next: express.NextFunction) => {
      req.context = this.context;
      req.service = this;
      return next();
    });
    // set endpoints
    let routes = this.params.get(ROUTES_KEY) as express.Router[];
    for (let route of routes) {
      this.server.use(route);
    }
    // set 404
    this.server.use((req: RequestExtended, res: express.Response) => {
      return res.status(StatusCodes.NOT_FOUND).json(ResponseFailure(req, 0, "page not found"));
    });
    // handle errors
    this.server.use((err: any, req: RequestExtended, res: express.Response, _next: express.NextFunction) => {
      req.service?.getLogger()?.error("Internal Server Error catched", err)
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ResponseFailure(req, -50, "Whops! Something went wrong!"))
    });
    // listen port
    this.instanceServer = this.server.listen({port: this.params.get(PORT_KEY) as number, host: this.params.get(HOST_KEY)});
    this.getLogger()?.info("Express Service", `Running at http://${this.params.get(HOST_KEY)}:${this.params.get(PORT_KEY)}`)
  }

  async onUnmount() {
    await (new Promise<void>((resolve, reject) => {
      this.instanceServer?.close(() => {
        resolve()
      })
    }))
  }

  /** 
   * Returns the logger service
   */
  getLogger() {
    return this.context.getServiceSafe("logger") as Logger | undefined;
  }
}

export function ResponseSuccess(req: RequestExtended, data: any, message?: string): BaseResponse {
  let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  req.service?.getLogger()?.success("Response", `${req.method} ${fullUrl}`)
  return {
    success: true,
    data,
    message
  }
}

export function ResponseFailure(req: RequestExtended, code: number, message: string, error?: any): BaseResponse {
  let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  req.service?.getLogger()?.error("Response", `${req.method} ${fullUrl} -> Failed with code ${code}`, error)
  return {
    success: false,
    code,
    message,
    error
  }
}