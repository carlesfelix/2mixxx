import BaseEntity from "./BaseEntity";
import User from "./User";

type RoomUser = {
  type: 'roomUser';
} & User & BaseEntity;

export default RoomUser;
