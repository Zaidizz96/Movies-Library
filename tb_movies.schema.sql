

create table if not exists tb_movies(
  id serial primary key,
  movie_id integer,
  title varchar(400),
  release_date  varchar(50),
  overview varchar(1000),
  comments varchar(400)
);