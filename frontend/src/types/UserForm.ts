import RegisteredUser from './RegisteredUser';

type UserForm = Partial<
  RegisteredUser & { password: string, repeatPassword: string }
>;

export default UserForm;
