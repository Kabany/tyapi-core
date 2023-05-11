import { Service } from "../service.core";
import { Context } from "../context.core";

const MODE = "MODE"

export enum LoggerMode {
  Console
}

/** Service to stylize the log output */
export class Logger extends Service {

  constructor(mode: LoggerMode, context: Context) {
    let params = new Map<string, any>()
    params.set(MODE, mode)
    super(params, context)
  }

  /**
   * Log an event in the stdout console with a green color
   */
  success(tag: string, data: any) {
    if (this.params.get(MODE) == LoggerMode.Console) {
      console.log(new Date().toISOString(), "[SUCCESS]", tag + ":", ...data)
      //console.log(chalk.green(new Date().toISOString()), chalk.bgGreen("[SUCCESS]"), chalk.green(tag + ":"), chalk.green(data));
    }
  }

  /**
   * Log an event in the stdout console with a magenta color
   */
  debug(tag: string, ...data: any) {
    if (this.params.get(MODE) == LoggerMode.Console) {
      console.log(new Date().toISOString(), "[DEBUG]", tag + ":", ...data)
      //console.log(chalk.magenta(new Date().toISOString()), chalk.bgMagenta("[DEBUG]"), chalk.magenta(tag + ":"), chalk.magenta(data));
    }
  }

  /**
   * Log an event in the stdout console with a blue color
   */
  info(tag: string, ...data: any) {
    if (this.params.get(MODE) == LoggerMode.Console) {
      console.log(new Date().toISOString(), "[INFO]", tag + ":", ...data)
      //console.log(chalk.blue(new Date().toISOString()), chalk.bgBlue("[INFO]"), chalk.blue(tag + ":"), chalk.blue(data));
    }
  }

  /**
   * Log an event in the stdout console with a yellow color
   */
  warn(tag: string, ...data: any) {
    if (this.params.get(MODE) == LoggerMode.Console) {
      console.log(new Date().toISOString(), "[WARN]", tag + ":", ...data)
      //console.log(chalk.yellow(new Date().toISOString()), chalk.bgYellow("[WARN]"), chalk.yellow(tag + ":"), chalk.yellow(data));
    }
  }

  /**
   * Log an event in the stdout console with a red color
   */
  error(tag: string, ...data: any) {
    if (this.params.get(MODE) == LoggerMode.Console) {
      console.log(new Date().toISOString(), "[ERROR]", tag + ":", ...data)
      //console.log(chalk.red(new Date().toISOString()), chalk.bgRed("[ERROR]"), chalk.red(tag + ":"), chalk.red(data));
    }
  }
}