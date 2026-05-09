export interface Transfer {
  _id?: string;

  senderId?: string;

  receiverEmail: string;

  amount: number;

  type: string;

  note?: string;

  status?: string;

  createdAt?: string;
}

export interface TransferState {
  loading: boolean;

  transfers: Transfer[];

  error: string | null;
}