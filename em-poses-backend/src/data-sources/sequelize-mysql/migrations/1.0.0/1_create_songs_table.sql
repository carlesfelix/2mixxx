CREATE TABLE Songs (
  id char(36) NOT NULL PRIMARY KEY,
  createdAt datetime NOT NULL,
  updatedAt datetime NOT NULL,
  title varchar(255) NOT NULL,
  artist varchar(255),
  libraryId char(36) NOT NULL,
  FOREIGN KEY (libraryId) REFERENCES Libraries(id)
    ON DELETE CASCADE
);
