interface AuthState {
  loading: "idle" | "pending" | "succeeded" | "failed";
  isAuthenticated: boolean;
  user: null | { name: string; email: string; token: string };
  error: null | string;
}

const initialState: AuthState = {
  loading: "idle",
  isAuthenticated: false,
  user: null,
  error: null,
};

export default initialState;
