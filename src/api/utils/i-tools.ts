export type LogLevel = "debug" | "error" | "trace";

class ITools {
  private level: LogLevel;

  constructor(level: LogLevel) {
    this.level = level;
    return this;
  }

  log(message: string) {
    switch (this.level) {
      case "debug":
        console.log(message);
        break;
      case "error":
        console.error(message);
        break;
      case "trace":
        console.warn(message);
        break;
    }
  }
}

const iTools = new ITools("trace");

export default iTools;
