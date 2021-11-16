CREATE TABLE song_requests (
  id char(36) NOT NULL PRIMARY KEY,
  createdAt datetime NOT NULL,
  updatedAt datetime NOT NULL,
  roomId char(36) NOT NULL,
  roomUserId char(36) NOT NULL,
  songId char(36) NOT NULL,
  CONSTRAINT song_requests__roomId_fk FOREIGN KEY (roomId)
    REFERENCES rooms (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT song_requests__roomUserId_fk FOREIGN KEY (roomUserId)
    REFERENCES room_users (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT song_requests__songId_fk FOREIGN KEY (songId)
    REFERENCES songs (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);
