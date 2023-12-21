import { memo } from "react";

import { Modal } from "react-bootstrap";
import { IFlight } from "../../../types/Flight";

type Props = {
  flightData: IFlight | null;
  showDialog: boolean;
  setShowDialog: (value: boolean) => void;
};
const ModalPhotoReview = memo(
  ({ flightData, showDialog, setShowDialog }: Props) => {
    return (
      <Modal show={showDialog} onHide={() => setShowDialog(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            Preview flight with code
            <span style={{ fontWeight: "bold" }}> {flightData?.code}</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={`http://localhost:3000/flights/${flightData?.id}/photo`}
            alt={flightData?.code}
            style={{ width: "100%" }}
          />
        </Modal.Body>
      </Modal>
    );
  }
);

export default ModalPhotoReview;
