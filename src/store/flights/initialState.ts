import { Flight } from "../../types/Flight";
import { TLoading } from "../../types/SharedTypes";
interface FlightsState {
  loading: TLoading;
  error: null | string;
  records: Array<Flight>;
  total: number;
  count: number;
}

const initialState: FlightsState = {
  loading: "idle",
  error: null,
  records: [],
  total: 0,
  count: 0,
};

export default initialState;
