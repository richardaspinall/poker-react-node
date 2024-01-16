## Initial DB schema

Super basic, we simply have a table for poker_tables which stores the id and name of the poker table and a players table which has an id, name and password (we might add session_id too).

There is also a junction table: poker_table_players which connects the players to tables
