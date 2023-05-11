import { assert } from "chai"
import { Context } from "../src/context.core"
import { Logger, LoggerMode } from "../src/logger/logger.service"

describe("Logger Service", async () => {
  it("should create the logger and handle its events", async () => {
    let app = new Context()
    let service = new Logger(LoggerMode.Console, app)
    await app.mountService("logger", service)

    let log = app.getServiceSafe("logger") as Logger
    assert.isNotNull(log)

    log.info("TEST", "this is a test")
    
    await app.unmountServices()
  })
})