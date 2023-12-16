import { Auth } from "../../types/Auth";
import { TLoading } from "../../types/SharedTypes";

interface AuthState {
  loading: TLoading;
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
