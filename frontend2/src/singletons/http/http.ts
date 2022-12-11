import createHttp, { IHttpBuilder } from '@/core/core-http'
import ENVIRONMENT from '@/environment'
import RemoteApiHttpBuilder from './RemoteApiHttpBuilder'

function getHttpBuilder (): IHttpBuilder {
  return new RemoteApiHttpBuilder(ENVIRONMENT.API_BASE_URL)
}

const httpBuilder = getHttpBuilder()
const http = createHttp(httpBuilder)

export default http
