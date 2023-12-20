import { memo, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { actEditFlight } from "../../../store/flights/flightsSlice";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { flightSchemaEdit } from "../../../util/flightSchemaEdit";
import { Modal, Button, Form } from "react-bootstrap";
import { Flight } from "../../../types/Flight";

type Props = {
  showDialog: boolean;
  setShowDialog: (value: boolean) => void;
  flightData: Flight | null;
};

type FormValues = {
  code?: string;
  capacity: number;
  departureDate: string;
};

const ModalEdit = memo(({ showDialog, setShowDialog, flightData }: Props) => {
  const { editLoading, error } = useAppSelector((state) => state.flights);
  const dispatch = useAppDispatch();

  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(flightSchemaEdit),
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    dispatch(
      actEditFlight({
        id: flightData?.id ? flightData?.id : "",
        code: data?.code ? data?.code : "",
        departureDate: data.departureDate,
        capacity: data?.capacity,
      })
    )
      .unwrap()
      .then(() => {
        setShowDialog(false);
      });
  };

  useEffect(() => {
    reset({
      code: flightData?.code,
      capacity: flightData?.capacity,
      departureDate: flightData?.departureDate,
    });
  }, [flightData, reset]);

  return (
    <Modal show={showDialog}>
      <Modal.Header>
        <Modal.Title>Edit Record</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Flight Code</Form.Label>
            <Form.Control type="text" disabled={true} {...register("code")} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Departure Date</Form.Label>
            <Form.Control
              type="date"
              {...register("departureDate")}
              isInvalid={!!errors.departureDate}
            />
            <Form.Control.Feedback type="invalid">
              {errors.departureDate?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Capacity</Form.Label>
            <Form.Control
              type="number"
              {...register("capacity")}
              isInvalid={!!errors.capacity}
            />
            <Form.Control.Feedback type="invalid">
              {errors.capacity?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            disabled={editLoading === "pending" ? true : false}
            style={{
              display: "inline-block",
              marginRight: "3px",
            }}
          >
            {editLoading === "pending" ? "Loading" : "Submit"}
          </Button>

          <Button variant="secondary" onClick={() => setShowDialog(false)}>
            Cancel
          </Button>

          {error ? (
            <p className="text-danger mt-2 font-weight-light">{error}</p>
          ) : (
            ""
          )}
        </Form>
      </Modal.Body>
    </Modal>
  );
});

export default ModalEdit;
