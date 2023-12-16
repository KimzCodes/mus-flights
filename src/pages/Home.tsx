import { useEffect, useState, useRef, useCallback } from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import {
  actGetFlights,
  actDeleteFlight,
  resetRecords,
} from "../store/flights/flightsSlice";
import { Loading } from "../feedback";
import { FlightsList } from "../flights";
import { Modal, Button } from "react-bootstrap";

const Home = () => {
  const dispatch = useAppDispatch();
  const { loading, error, records } = useAppSelector((state) => state.flights);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const selectedRecord = useRef<null | { id: string; code: string }>(null);

  useEffect(() => {
    dispatch(actGetFlights());

    return () => {
      dispatch(resetRecords());
    };
  }, [dispatch]);

  const selectRecordHandler = useCallback(
    (data: { id: string; code: string }) => {
      setShowDialog(true);
      selectedRecord.current = data;
    },
    []
  );

  const deleteHandler = () => {
    const id: string = selectedRecord.current?.id ?? "";
    setShowDialog(false);
    dispatch(actDeleteFlight(id))
      .unwrap()
      .then(() => {
        dispatch(actGetFlights());
      });
  };

  return (
    <>
      <h4 className="mb-4 mt-4">All Flights</h4>

      <Modal show={showDialog} onHide={() => setShowDialog(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Record</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are your sure you want to delete flight with code
          <span style={{ fontWeight: "bold" }}>
            {" "}
            {selectedRecord.current?.code}
          </span>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDialog(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={deleteHandler}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Loading loading={loading} error={error}>
        <FlightsList records={records} onDelete={selectRecordHandler} />
      </Loading>
    </>
  );
};

export default Home;
