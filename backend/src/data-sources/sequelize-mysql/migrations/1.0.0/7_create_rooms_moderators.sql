CREATE TABLE rooms_moderators (
  createdAt datetime NOT NULL,
  updatedAt datetime NOT NULL,
  roomId char(36) NOT NULL,
  registeredUserId char(36) NOT NULL,
  CONSTRAINT rooms_moderators__pk PRIMARY KEY (roomId, registeredUserId),
  CONSTRAINT rooms_moderators__roomId_fk FOREIGN KEY (roomId)
    REFERENCES rooms (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT rooms_moderators__registeredUserId_fk FOREIGN KEY (registeredUserId)
    REFERENCES registered_users (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);
