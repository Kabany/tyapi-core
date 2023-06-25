import express from "express"
import req from "supertest"
import { assert } from "chai"

import { Context, ExpressServer, Logger, LoggerMode, RequestExtended } from "../src"

let server: Context
let router = express.Router()
router.get("/test", async (req: RequestExtended, res: express.Response) => {
  return res.json({ok: true})
})

async function loadServer() {
  server = new Context()
  await server.mountService("logger", new Logger(LoggerMode.Console, server))
  let eservice = new ExpressServer({host: "localhost", port: 3000}, [router], server)
  await server.mountService("express", eservice)
}

describe("Express Service", async () => {
  it("should create the server and return a 200 response", async () => {
    await loadServer()
    let eservice = server.getService("express") as ExpressServer
    const res = await req(eservice.server).get('/test')
    assert.equal(res.status, 200)
    assert.equal(res.body.ok, true)
    await server.unmountServices()
  })
})