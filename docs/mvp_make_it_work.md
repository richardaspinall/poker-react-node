## Preface:

This phase of the project is the MVP – Minimum Viable Product and it's all about "making it work". The Project Learning Objectives should be anchored to set up and getting something working which is described below:

## MVP

2 player (heads up) Texas Holdem
Minimal frontend where 2 players can click to sit at seats at a table, click a button to say they are ready, and have buttons to fold, check, call, bet (with basic bet logic). Cards, table and whose turn it is should be clear.
Game logic to iterate through each players turn and then street (preflop, flop, turn, river) showing each community card
External API call for determining the winning hand

## Domain definitions

| Term              | Definition                                                                                                                                            |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Community card(s) | Cards that everyone can see and use to complete their hand                                                                                            |
| Hand              | Set of 5 cards                                                                                                                                        |
| Heads up          | 1 on 1 – playing against one player                                                                                                                   |
| Hole cards        | Player's two dealt cards (they hide from other players)                                                                                               |
| Street            | A betting round                                                                                                                                       |
| Texas Holdem      | Game type in poker where each person gets 2 playing cards and makes bets against at least 1 player to make the best 5 cards combining community cards |
| Winning hand      | Best 5 cards that a player can form (could be all 5 community cards) determined against a rank of hands. The most unlikely wins.                      |
