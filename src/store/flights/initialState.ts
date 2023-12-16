interface Flight {
  id: string;
  code: string;
  capacity: number;
  departureDate: string;
}

interface FlightsState {
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: null | string;
  records: Flight[];
}

const initialState: FlightsState = {
  loading: "idle",
  error: null,
  records: [],
};

export default initialState;
