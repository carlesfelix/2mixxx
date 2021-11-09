CREATE TABLE RoomUsers (
  id char(36) NOT NULL PRIMARY KEY,
  createdAt datetime NOT NULL,
  updatedAt datetime NOT NULL,
  roomId char(36) NOT NULL,
  CONSTRAINT RoomUsers_roomId_fk FOREIGN KEY (roomId)
    REFERENCES Rooms (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);
