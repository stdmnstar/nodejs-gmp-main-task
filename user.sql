-- DROP TABLE users;

create table if not exists users (
  id SERIAL primary key,
	login VARCHAR not null,
	password VARCHAR not null,
	age INT not null,
	"isDeleted" boolean default false not null
);

insert into users (login, password, age, "isDeleted") values
('Alex Min', 'qwerty123456', 33, false),
('Max Min', 'qwerty123456', 44, false),
('Nim Min', 'qwerty123456', 28, false),
('Kim Kim', 'qwerty123456', 25, false);
