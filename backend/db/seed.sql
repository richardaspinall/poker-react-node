INSERT INTO users
(username, password)
VALUES 
('raspinall', 'testpassword'),
('thomas', 'testpassword');

INSERT INTO poker_tables
(poker_table_name)
VALUES
('table_1'),
('table_2');

INSERT INTO poker_table_users
(poker_table_id, user_id)
VALUES
(1, 1000),
(1, 1001),
(2, 1000);