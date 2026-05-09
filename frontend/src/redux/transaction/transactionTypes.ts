export interface Transaction {
  _id: string;

  name: string;

  type: string;

  amount: string;

  status: string;
}

export interface TransactionState {
  loading: boolean;

  transactions: Transaction[];

  error: string | null;
}