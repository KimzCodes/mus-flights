import { memo } from "react";
import { Flight } from "../../types/Flight";
import { Table, ButtonGroup, Button } from "react-bootstrap";

type props = {
  records: Array<Flight>;
  onDelete: (data: { id: string; code: string }) => void;
};

const FlightsList = memo(({ records, onDelete }: props) => {
  const renderFlights =
    records.length > 0 ? (
      records.map((record, idx) => (
        <tr key={record.id}>
          <td>{++idx}</td>
          <td>{record.code}</td>
          <td>{record.capacity}</td>
          <td>{record.departureDate}</td>
          <td className="text-center">
            <ButtonGroup>
              <Button variant="success">Edit</Button>
              <Button
                variant="danger"
                onClick={() => onDelete({ id: record.id, code: record.code })}
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
  );
});

export default FlightsList;
