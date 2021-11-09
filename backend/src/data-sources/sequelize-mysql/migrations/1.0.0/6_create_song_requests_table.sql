CREATE TABLE SongRequests (
  id char(36) NOT NULL PRIMARY KEY,
  createdAt datetime NOT NULL,
  updatedAt datetime NOT NULL,
  roomId char(36) NOT NULL,
  roomUserId char(36) NOT NULL,
  songId char(36) NOT NULL,
  CONSTRAINT SongRequests_roomId_fk FOREIGN KEY (roomId)
    REFERENCES Rooms (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT SongRequests_roomUserId_fk FOREIGN KEY (roomUserId)
    REFERENCES RoomUsers (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT SongRequests_songId_fk FOREIGN KEY (songId)
    REFERENCES Songs (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);
