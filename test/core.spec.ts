import { assert } from "chai"
import { Context } from "../src/context.core"
import { Service } from "../src/service.core"

class ExtendedService extends Service {
  private STATUS = "STATUS"
  constructor(params: Map<string, any>, context: Context) {
    super(params, context)
    this.params.set(this.STATUS, "constructor")
  }
  async beforeMount() {
    this.params.set(this.STATUS, "beforeMount")
  }
  async onMount() {
    this.params.set(this.STATUS, "onMount")
  }
  async beforeUnmount() {
    this.params.set(this.STATUS, "beforeUnmount")
  }
  async onUnmount() {
    this.params.set(this.STATUS, "onUnmount")
  }
  public getStatus() {
    return this.params.get(this.STATUS) as string
  }
}

describe("Context and Service", async () => {
  it("should create app and handle service events", async () => {
    let app = new Context()
    let service = new ExtendedService(new Map(), app)
    await app.mountService("service", service)
    assert.equal(service.getStatus(), "onMount")
    await app.unmountServices()
    assert.equal(service.getStatus(), "onUnmount")
  })
})