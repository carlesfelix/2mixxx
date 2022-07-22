import Joi from 'joi';

export type UserSchema = {
  songId: string;
};
export const userSchema = Joi.object<UserSchema, UserSchema, UserSchema>({
  songId: Joi.string().uuid().required()
});
