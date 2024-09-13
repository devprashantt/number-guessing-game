class JsonHelper {
  public static parseData<T>(json: string): T {
    return JSON.parse(json);
  }

  public static stringifyData<T>(data: T): string {
    return JSON.stringify(data);
  }

  public parseData<T>(json: string): T {
    return JSON.parse(json);
  }
}

export default new JsonHelper();
