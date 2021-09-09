import IBaseEntity from './IBaseEntity';

export default interface IRegisteredUserEntity extends IBaseEntity {
  email: string;
  role: number;
}
