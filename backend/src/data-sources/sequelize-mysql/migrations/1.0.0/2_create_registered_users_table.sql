CREATE TABLE registered_users (
  id char(36) NOT NULL PRIMARY KEY,
  createdAt datetime NOT NULL,
  updatedAt datetime NOT NULL,
  email varchar(255) NOT NULL UNIQUE,
  userRole tinyint NOT NULL
);
