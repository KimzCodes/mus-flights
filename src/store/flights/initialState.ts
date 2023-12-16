import { Flight } from "../../types/Flight";

interface FlightsState {
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: null | string;
  records: Array<Flight>;
}

const initialState: FlightsState = {
  loading: "idle",
  error: null,
  records: [],
};

export default initialState;
