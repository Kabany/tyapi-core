/* 
  @TyAPI Core - Service Class
*/

import { Context } from "./context.core"

/**
 * Context component of the TyAPI Core. Handle the app services like connections to databases or bring several handlers available in the context core.
 */
export class Service {
  protected params: Map<string, any>
  context: Context

  /**
   * Create a service to be added in the context on the app.
   * @param params - Variables required to initiate the service
   * @param context - Main context. It will give access for other services added in the context core.
   */
  constructor(params: Map<string, any>, context: Context) {
    this.params = params
    this.context = context
  }

  /**
   * Handle the event to prepare the service parameters.
   */
  async beforeMount() {
    if (this.params == null) {
      this.params = new Map()
    }
  }

  /**
   * Handle the starting up event service. It can be used for create a connection with the database as an example.
   */
  async onMount() {}

  /**
   * Handle the event to prepare the service before shutting down.
   */
  async beforeUnmount() {}

  /**
   * Handle the shutting down event service. It can be used to close the connection from a database as an example.
   */
  async onUnmount() {
    if (this.params != null) {
      this.params.clear()
    }
  }
}