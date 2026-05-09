export interface Payment {
  _id: string;

  title: string;

  amount: string;

  category: string;
}

export interface PaymentState {
  loading: boolean;

  payments: Payment[];

  error: string | null;
}