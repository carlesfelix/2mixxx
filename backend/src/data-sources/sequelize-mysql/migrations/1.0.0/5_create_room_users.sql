CREATE TABLE room_users (
  id char(36) NOT NULL PRIMARY KEY,
  createdAt datetime NOT NULL,
  updatedAt datetime NOT NULL,
  roomId char(36) NOT NULL,
  CONSTRAINT room_users__roomId_fk FOREIGN KEY (roomId)
    REFERENCES rooms (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);
