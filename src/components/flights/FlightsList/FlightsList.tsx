import { memo } from "react";
import useResponsiveLayout from "../../../hooks/useResponsiveLayout";
import FlightsTableView from "../FlightsTableView/FlightsTableView";
import FlightsCardView from "../FlightsCardView/FlightsCardView";
import { Pagination } from "react-bootstrap";
import { IFlightWithCrudHandler, IFlight } from "../../../types/Flight";

type Props = {
  records: Array<IFlight>;
  selectRecord: (data: IFlightWithCrudHandler) => void;
  totalPaginationItems: number;
  pagination: (page: number) => void;
  pageSize: number;
  currentPage: number;
};

const FlightsList = memo(
  ({
    records,
    selectRecord,
    pagination,
    totalPaginationItems,
    currentPage,
    pageSize,
  }: Props) => {
    const { screenSize } = useResponsiveLayout();

    const paginationItems = [...Array(totalPaginationItems)].map((_, index) => {
      return (
        <Pagination.Item onClick={() => pagination(index)} key={index}>
          {++index}
        </Pagination.Item>
      );
    });

    const startIndex = (currentPage - 1) * pageSize + 1;

    return (
      <>
        {screenSize === "large" ? (
          <FlightsTableView
            startIndex={startIndex}
            records={records}
            selectRecord={selectRecord}
          />
        ) : (
          <FlightsCardView
            startIndex={startIndex}
            records={records}
            selectRecord={selectRecord}
          />
        )}

        {totalPaginationItems > 1 ? (
          <Pagination className="d-flex align-items-center justify-content-center ">
            {paginationItems}
          </Pagination>
        ) : (
          ""
        )}
      </>
    );
  }
);

export default FlightsList;
