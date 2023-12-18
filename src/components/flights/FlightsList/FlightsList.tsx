import { memo } from "react";
import { Table, ButtonGroup, Button, Pagination, Form } from "react-bootstrap";
import { IFlightWithCrudHandler } from "../../../types/Flight";
import { Flight } from "../../../types/Flight";

type props = {
  records: Array<Flight>;
  selectRecord: (data: IFlightWithCrudHandler) => void;
  totalPaginationItems: number;
  pagination: (page: number, size: number) => void;
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
  }: props) => {
    const paginationItems = [...Array(totalPaginationItems)].map((_, index) => {
      return (
        <Pagination.Item onClick={() => pagination(index)} key={index}>
          {++index}
        </Pagination.Item>
      );
    });

    const startIndex = (currentPage - 1) * pageSize + 1;

    const renderFlights =
      records.length > 0 ? (
        records.map((record, idx) => (
          <tr key={record.id}>
            <td>{startIndex + idx}</td>
            <td>{record.code}</td>
            <td>{record.capacity}</td>
            <td>{record.departureDate}</td>
            <td className="text-center">
              <ButtonGroup>
                <Button
                  variant="success"
                  onClick={() => selectRecord({ ...record, handle: "edit" })}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() =>
                    selectRecord({
                      ...record,
                      handle: "delete",
                    })
                  }
                >
                  Delete
                </Button>
              </ButtonGroup>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={5} className="text-center">
            There are no records to render
          </td>
        </tr>
      );

    return (
      <>
        <Table striped bordered hover className="mt-1">
          <thead>
            <tr>
              <th>#</th>
              <th>Code</th>
              <th>Capacity</th>
              <th>Departure Date</th>
              <td></td>
            </tr>
          </thead>
          <tbody>{renderFlights}</tbody>
        </Table>

        <Pagination>{paginationItems}</Pagination>
        <Form.Select
          aria-label="Default select example"
          onChange={(e) => {
            console.log(e.target.value);
          }}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </Form.Select>
      </>
    );
  }
);

export default FlightsList;
