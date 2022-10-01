import AnyUser from "./AnyUser";

type RegisteredUser = {
  email: string;
  role: string;
} & AnyUser;

export default RegisteredUser;
