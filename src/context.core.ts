/* 
  @TyAPI Core - Context Class
*/

import { TyapiError } from "./error.core";
import { Service } from "./service.core";

/**
 * Base element for the Core Library. It handles the life cycle of services.
 */
export class Context {
  private services: Map<string, Service> = new Map()

  /** 
   * Returns a service loaded in the context.
   * It can throw an error if the service is not declared or mounted.
   * @param serviceName - Key name to find a declared service in the context.
   */
  getService(serviceName: string) {
    if (!this.services.has(serviceName)) {
      throw new TyapiError("No service found with the name: " + serviceName);
    }
    return this.services.get(serviceName)!;
  }

  /** 
   * Returns a service loaded in the context.
   * It can return `null` error if the service is not declared or mounted.
   * @param serviceName - Key name to find a declared service in the context.
   */
  getServiceSafe(serviceName: string) {
    return this.services.get(serviceName);
  }

  /**
   * Mount a declared service. The Context will handle the life cycle of the mounted service.
   * @param serviceName - Key name to find a declared service in the context.
   * @param service - A Core Service to add in the context app.
   */
  async mountService(serviceName: string, service: Service) {
    if (this.services.has(serviceName)) {
      throw new TyapiError("There is a service already loaded with the name: " + serviceName);
    }
    await service.beforeMount()
    this.services.set(serviceName, service)
    await this.services.get(serviceName)?.onMount()
  }

  /**
   * Unmount all services. Must be called when the main thread will exit.
   */
  async unmountServices() {
    for await (let pair of this.services.entries()) {
      let service = pair[1]
      await service.beforeMount()
      await service.onUnmount()
      this.services.delete(pair[0])
    }
  }
}