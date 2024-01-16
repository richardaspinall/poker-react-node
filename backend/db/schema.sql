CREATE TABLE players (
  player_id INT unsigned NOT NULL AUTO_INCREMENT,
  username VARCHAR(20) NOT NULL UNIQUE,
  password CHAR(60) NOT NULL,
  PRIMARY KEY (player_id)
);
CREATE TABLE poker_tables (
  poker_table_id INT unsigned NOT NULL AUTO_INCREMENT,
  poker_table_name VARCHAR(20) NOT NULL UNIQUE,
  PRIMARY KEY (poker_table_id)
);
CREATE TABLE poker_table_players (
  poker_table_id INT unsigned NOT NULL,
  player_id INT unsigned NOT NULL,
  PRIMARY KEY (poker_table_id, player_id),
  FOREIGN KEY (poker_table_id) REFERENCES poker_tables(poker_table_id),
  FOREIGN KEY (player_id) REFERENCES players(player_id)
);
ALTER TABLE players AUTO_INCREMENT = 1000;