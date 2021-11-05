import { string, object } from 'joi';

export type UserSchema = {
  songId: string;
};
export const userSchema = object<UserSchema, UserSchema, UserSchema>({
  songId: string().uuid().required()
});
