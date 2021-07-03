import HttpRequest from "./api";

export default class MoviesProvider extends HttpRequest {
  private path: string = "auth";

  constructor(path: string) {
    super();
    this.path = path;
  }
  public register(data: any) {
    return this.create(`${this.path}/register`, data);
  }
  public login(data: any) {
    return this.create(`${this.path}/login`, data);
  }
}
