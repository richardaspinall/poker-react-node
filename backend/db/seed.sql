INSERT INTO players
(username, password)
VALUES 
('raspinall', 'testpassword'),
('thomas', 'testpassword');

INSERT INTO poker_tables
(poker_table_name)
VALUES
('table_1'),
('table_2');

INSERT INTO poker_table_players
(poker_table_id, player_id)
VALUES
(1, 1000),
(1, 1001),
(2, 1000);