import { CardShortCode } from './CardShortCode';
import { Suit } from './Suit';

export type Card = {
  suit: Suit;
  rank: string;
  cardShortCode: CardShortCode;
};
