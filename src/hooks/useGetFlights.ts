import { useCallback } from "react";
import { useAppSelector } from "../store/hooks";
import { actGetFlights } from "../store/flights/flightsSlice";

const useGetFlights = () => {
  const { loading, error, records, count } = useAppSelector(
    (state) => state.flights
  );
  const pageSize = 10;
  const totalPaginationItems = Math.ceil(count / pageSize);

  const getFlights = (size: number, pageNum: number, search: string) => {
    actGetFlights({
      size: size,
      page: pageNum,
      search: search,
    });
  };

  return {
    loading,
    error,
    records,
    count,
    totalPaginationItems,
    pageSize,
    getFlights,
  };
};

export default useGetFlights;
