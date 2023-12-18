import { Flight } from "../../types/Flight";
import { TLoading } from "../../types/SharedTypes";
interface FlightsState {
  loading: TLoading;
  editLoading: TLoading;
  error: null | string;
  records: Array<Flight>;
  selectedRecord: Flight | null;
  total: number;
}

const initialState: FlightsState = {
  loading: "idle",
  editLoading: "idle",
  error: null,
  records: [],
  selectedRecord: null,
  total: 0,
};

export default initialState;
