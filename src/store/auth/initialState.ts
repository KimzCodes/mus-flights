import { Auth } from "../../types/Auth";
interface AuthState {
  loading: "idle" | "pending" | "succeeded" | "failed";
  isAuthenticated: boolean;
  user: null | Auth;
  error: null | string;
}

const initialState: AuthState = {
  loading: "idle",
  isAuthenticated: false,
  user: null,
  error: null,
};

export default initialState;
