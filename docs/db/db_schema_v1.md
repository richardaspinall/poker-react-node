## Initial DB schema

Super basic, we simply have a table for poker_tables which stores the id and name of the poker table and a players table which has an id, name and password (we might add session_id too).

There is also a junction table: poker_table_players which connects the players to tables

<img width="1107" alt="Screenshot 2024-01-16 at 7 19 31 pm" src="https://github.com/richardaspinall/poker-react-node/assets/15721687/a8e2cc17-f00e-4a2e-b135-8be84b81cfb1">
