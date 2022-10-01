import BaseEntity from "./BaseEntity";
import UserType from "./UserType"

type AnyUser = {
  type: UserType;
  permissions: string[];
} & BaseEntity;

export default AnyUser;
