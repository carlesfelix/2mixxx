import type IHttp from './IHttp'

export default interface IHttpBuilder {
  getInstance: () => IHttp
}
