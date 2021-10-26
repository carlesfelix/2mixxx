import { InteractorErrorCodeEnum } from '../../../core/services/InteractorError';

export function getStatusFromInteractorErrorCode(errorCode: InteractorErrorCodeEnum): number {
  const statuses = {
    [InteractorErrorCodeEnum.ENTITY_NOT_FOUND]: 404,
    [InteractorErrorCodeEnum.GENERIC]: 500,
    [InteractorErrorCodeEnum.UNAUTHORIZED]: 401,
    [InteractorErrorCodeEnum.ACCESS_DENIED]: 403,
    [InteractorErrorCodeEnum.BAD_INPUT_DATA]: 400,
  };
  return statuses[errorCode];
}
