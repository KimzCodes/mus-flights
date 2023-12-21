export interface IFlight {
  id: string;
  img: string;
  status: string;
  code: string;
  capacity: number;
  departureDate: string;
}

export interface IFlightWithCrudHandler extends Flight {
  handle: "delete" | "edit";
}
