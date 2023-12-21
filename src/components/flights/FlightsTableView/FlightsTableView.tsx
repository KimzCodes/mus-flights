import { Table, ButtonGroup, Button } from "react-bootstrap";
import ReviewImage from "../../../assets/svg/reviewImage.svg?react";
import NoImage from "../../../assets/svg/noImage.svg?react";
import { IFlightWithCrudHandler, IFlight } from "../../../types/Flight";

type Props = {
  startIndex: number;
  records: Array<IFlight>;
  selectRecord: (data: IFlightWithCrudHandler) => void;
};

const FlightsTableView = ({ startIndex, records, selectRecord }: Props) => {
  const renderFlights =
    records.length > 0 ? (
      records.map((record, idx) => (
        <tr key={record.id}>
          <td>{startIndex + idx}</td>
          <td>{record.code}</td>
          <td>{record.capacity}</td>
          <td>{record.departureDate}</td>
          <td>
            <div className="d-flex justify-content-center">
              {record.img ? (
                <ReviewImage
                  style={{
                    height: "30px",
                    width: "30px",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    selectRecord({ ...record, handle: "imageReview" })
                  }
                />
              ) : (
                <NoImage style={{ height: "30px", width: "30px" }} />
              )}
            </div>
          </td>
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
        <td colSpan={6} className="text-center">
          There are no flights to render
        </td>
      </tr>
    );
  return (
    <Table striped bordered hover className="mt-1">
      <thead>
        <tr>
          <th>#</th>
          <th>Code</th>
          <th>Capacity</th>
          <th>Departure Date</th>
          <th>Review Image</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>{renderFlights}</tbody>
    </Table>
  );
};

export default FlightsTableView;
