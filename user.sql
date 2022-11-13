-- DROP TABLE users;

create table if not exists users (
    id SERIAL primary key,
	login VARCHAR not null,
	password VARCHAR not null,
	age INT CHECK (age >= 4 and age <= 130),
	"isDeleted" boolean default false
);

insert into users (login, password, age, "isDeleted") values
('Alex Min', 'qwerty123456', 33, false),
('Max Min', 'qwerty123456', 44, false),
('Nim Min', 'qwerty123456', 28, false),
('Kim Kim', 'qwerty123456', 25, false);
