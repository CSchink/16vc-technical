class ITools {
  private level: "debug" | "error" | "trace";
  constructor(level: "debug" | "error" | "trace") {
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
