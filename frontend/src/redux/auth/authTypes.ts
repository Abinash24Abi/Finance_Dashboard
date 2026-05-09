export interface User {
  _id: string;

  name: string;

  email: string;
}

export interface AuthState {
  loading: boolean;

  user: User | null;

  error: string | null;
}