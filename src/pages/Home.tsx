import Table from "react-bootstrap/Table";

const Home = () => {
  return (
    <>
      <h4 className="mt-4">Flights</h4>

      <Table striped bordered hover className="mt-1">
        <thead>
          <tr>
            <th>#</th>
            <th>Code</th>
            <th>Capacity</th>
            <th>Departure Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td>3</td>
            <td colSpan={2}>Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default Home;
