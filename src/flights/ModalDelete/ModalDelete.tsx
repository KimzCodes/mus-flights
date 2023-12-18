import { memo } from "react";
import { Modal, Button } from "react-bootstrap";

type Props = {
  showDialog: boolean;
  code: string;
  setShowDialog: (value: boolean) => void;
  deleteHandler: () => void;
};
const ModalDelete = memo(
  ({ showDialog, setShowDialog, code, deleteHandler }: Props) => {
    return (
      <Modal show={showDialog} onHide={() => setShowDialog(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Record</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are your sure you want to delete flight with code
          <span style={{ fontWeight: "bold" }}> {code}</span>
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
    );
  }
);

export default ModalDelete;
