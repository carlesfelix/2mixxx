import User from './User';

export type AnyUserAuth<U extends User = User> = {
  type: 'roomUser' | 'registeredUser';
  user: U;
};
