import type IHttp from './IHttp'
import type IHttpBuilder from './IHttpBuilder'

export default function createHttp (httpBuilder: IHttpBuilder): IHttp {
  return httpBuilder.getInstance()
}
