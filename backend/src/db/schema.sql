CREATE TABLE users (
  user_id INT unsigned NOT NULL AUTO_INCREMENT,
  username VARCHAR(20) NOT NULL UNIQUE,
  password CHAR(60) NOT NULL,
  PRIMARY KEY (user_id)
);

CREATE TABLE poker_tables (
  poker_table_id INT unsigned NOT NULL AUTO_INCREMENT,
  poker_table_name VARCHAR(20) NOT NULL UNIQUE,
  PRIMARY KEY (poker_table_id)
);
CREATE TABLE poker_table_users (
  poker_table_id INT unsigned NOT NULL,
  user_id INT unsigned NOT NULL,
  PRIMARY KEY (poker_table_id, user_id),
  FOREIGN KEY (poker_table_id) REFERENCES poker_tables(poker_table_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);
ALTER TABLE users AUTO_INCREMENT = 1000;