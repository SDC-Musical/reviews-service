DROP DATABASE IF EXISTS product_reviews;
CREATE DATABASE product_reviews;

CREATE TABLE reviews(
  id serial NOT NULL,
  product_id integer NOT NULL,
  username text NOT NULL,
  review_heading text NOT NULL,
  review_text text NOT NULL,
  review_rating smallint NOT NULL,
  created_at timestamp without time zone NOT NULL
);