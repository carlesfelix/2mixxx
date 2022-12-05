import { IHttp } from "@/core/core-http";
import AxiosHttp from "@/core/core-http/AxiosHttp";
import IHttpBuilder from "@/core/core-http/IHttpBuilder";

export default class RemoteApiHttpBuilder implements IHttpBuilder {
  #baseUrl: string;
  constructor(baseUrl: string) {
    this.#baseUrl = baseUrl;
  }
  getInstance(): IHttp {
    return new AxiosHttp({ baseUrl: this.#baseUrl });
  }

}