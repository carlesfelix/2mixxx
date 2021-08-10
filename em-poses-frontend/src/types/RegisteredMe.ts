import GuestMe from './GuestMe';

type RegisteredMe = {
  email: string;
  fullName: string;
  picture: string;
} & GuestMe;

export default RegisteredMe;
