CREATE TABLE LibrariesRooms (
  createdAt datetime NOT NULL,
  updatedAt datetime NOT NULL,
  roomId char(36) NOT NULL,
  libraryId char(36) NOT NULL,
  CONSTRAINT LibrariesRooms_pk PRIMARY KEY (roomId, libraryId),
  CONSTRAINT LibrariesRooms_roomId_fk FOREIGN KEY (roomId)
    REFERENCES Rooms (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT LibrariesRooms_libraryId_fk FOREIGN KEY (libraryId)
    REFERENCES Libraries (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);
