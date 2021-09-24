CREATE TABLE Rooms (
  id char(36) NOT NULL PRIMARY KEY,
  createdAt datetime NOT NULL,
  updatedAt datetime NOT NULL,
  code varchar(16) NOT NULL UNIQUE,
  allowSongRequests boolean NOT NULL
);
