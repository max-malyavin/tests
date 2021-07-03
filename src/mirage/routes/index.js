import userRouter from "./userRouter";

const baseURL = 4200 || process.env.REACT_APP_API_BASE_URL;

const RoutesHandlers = [...userRouter];

export default function routes() {
  this.namespace = "api";
  this.urlPrefix = `${baseURL}`;
  this.timing = 1000;

  RoutesHandlers.forEach(({ type, url, handler, response }) => {
    this[type](url, handler, response);
  });

  this.passthrough();
}
