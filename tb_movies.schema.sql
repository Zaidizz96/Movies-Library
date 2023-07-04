create table if not exists tb_movies(
  id serial primary key,
  movie_id integer,
  title varchar(200),
  release_date  varchar(200),
  overview varchar(200),
  comments varchar(200)
);