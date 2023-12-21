import { Card, ButtonGroup, Button } from "react-bootstrap";
import ReviewImage from "../../../assets/svg/reviewImage.svg?react";
import NoImage from "../../../assets/svg/noImage.svg?react";
import { IFlightWithCrudHandler, IFlight } from "../../../types/Flight";

type Props = {
  startIndex: number;
  records: Array<IFlight>;
  selectRecord: (data: IFlightWithCrudHandler) => void;
};

const FlightsCardView = ({ startIndex, records, selectRecord }: Props) => {
  const renderFlights =
    records.length > 0 ? (
      records.map((record, idx) => (
        <Card className="mb-2">
          <Card.Body>
            <Card.Title>
              #{startIndex + idx} {`Flight Code: ${record.code}`}
            </Card.Title>
            <Card.Text>
              <strong>Departure Date:</strong> {record.departureDate} <br />
              <strong>Capacity:</strong> {record.capacity}
              <br />
              <strong>Review Image:</strong>
              {record.img ? (
                <ReviewImage
                  style={{
                    height: "30px",
                    width: "30px",
                    cursor: "pointer",
                    marginLeft: "10px",
                  }}
                  onClick={() =>
                    selectRecord({ ...record, handle: "imageReview" })
                  }
                />
              ) : (
                <NoImage
                  style={{ height: "30px", width: "30px", marginLeft: "10px" }}
                />
              )}
            </Card.Text>
          </Card.Body>
          <ButtonGroup style={{ padding: "5px" }}>
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
        </Card>
      ))
    ) : (
      <div> There are no flights to render</div>
    );

  return <div>{renderFlights}</div>;
};

export default FlightsCardView;
