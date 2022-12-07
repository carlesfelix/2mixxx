import IHttp from './IHttp'
import IHttpBuilder from './IHttpBuilder'

export default function createHttp (httpBuilder: IHttpBuilder): IHttp {
  return httpBuilder.getInstance()
}
