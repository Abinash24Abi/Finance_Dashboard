export interface Card {
  _id: string;

  cardHolder: string;

  cardNumber: string;

  balance: number;

  expiry: string;
}

export interface CardState {
  loading: boolean;

  cards: Card[];

  error: string | null;
}