/* 
  @TyAPI Core - Error Classes
*/

import { StatusCodes } from "http-status-codes";

/**
 * TypeAPI Core Error.
 * Class for general errors.
 */
export class TyapiError extends Error {
  statusCode: number
  responseMessage: string
  details: any

  /**
   * Generate an error to specify details that caused the issue and specify as possible all deatails that can be send in an API response.
   */
  constructor(error: string, statusCode?: number, responseMessage?: string, details?: any) {
    super("Tyapi Error: " + error)
    this.statusCode = statusCode || StatusCodes.INTERNAL_SERVER_ERROR
    this.responseMessage = responseMessage
    this.details = details
    Object.setPrototypeOf(this, TyapiError.prototype);
  }
}