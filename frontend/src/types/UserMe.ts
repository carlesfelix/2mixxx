import GuestMe from './GuestMe';
import RegisteredMe from './RegisteredMe';

type UserMe = { type: 'guest' } & GuestMe |
  { type: 'registered' } & RegisteredMe;

export default UserMe;
