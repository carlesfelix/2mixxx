import createHttp, { IHttpBuilder } from "@/core/core-http";
import RemoteApiHttpBuilder from "./RemoteApiHttpBuilder";

function getHttpBuilder(): IHttpBuilder {
  return new RemoteApiHttpBuilder('http://localhost:3001/api');
}

const httpBuilder = getHttpBuilder();
const http = createHttp(httpBuilder);

export default http;
