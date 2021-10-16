import IBaseEntity from "./IBaseEntity";

export default interface ILibraryRoomEntity extends IBaseEntity {
  roomId: string;
  libraryId: string;
}
