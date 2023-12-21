export interface IFlight {
  id: string;
  img: string;
  status: string;
  code: string;
  capacity: number;
  departureDate: string;
}

export interface IFlightWithCrudHandler extends IFlight {
  handle: "delete" | "edit" | "imageReview";
}
