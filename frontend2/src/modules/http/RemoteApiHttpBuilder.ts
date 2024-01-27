import { IHttp, AxiosHttp, IHttpBuilder } from '@/core/core-http'

export default class RemoteApiHttpBuilder implements IHttpBuilder {
  #baseUrl: string
  constructor (baseUrl: string) {
    this.#baseUrl = baseUrl
  }

  getInstance (): IHttp {
    return new AxiosHttp({ baseUrl: this.#baseUrl })
  }
}
