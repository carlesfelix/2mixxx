CREATE TABLE libraries_rooms (
  createdAt datetime NOT NULL,
  updatedAt datetime NOT NULL,
  roomId char(36) NOT NULL,
  libraryId char(36) NOT NULL,
  CONSTRAINT libraries_rooms__pk PRIMARY KEY (roomId, libraryId),
  CONSTRAINT libraries_rooms__roomId_fk FOREIGN KEY (roomId)
    REFERENCES rooms (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT libraries_rooms__libraryId_fk FOREIGN KEY (libraryId)
    REFERENCES libraries (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);
