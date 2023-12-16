import { useAppDispatch, useAppSelector } from "../store/hooks";
import { actCreateFlight } from "../store/flights/flightsSlice";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { flightSchema } from "../util/flightSchema";
import { Button, Form, Row, Col } from "react-bootstrap";

type FormValues = {
  code: string;
  capacity: number;
  departureDate: string;
};

const InsertFlight = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.flights);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(flightSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    dispatch(actCreateFlight(data))
      .unwrap()
      .then(() => navigate("/home"));
  };

  return (
    <Row>
      <Col sm={{ span: 6, offset: 3 }}>
        <h4 className="mb-4 mt-5">Create New Flight</h4>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Flight Code</Form.Label>
            <Form.Control
              type="text"
              {...register("code")}
              isInvalid={!!errors.code}
            />
            <Form.Control.Feedback type="invalid">
              {errors.code?.message}
            </Form.Control.Feedback>
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
            disabled={loading === "pending" ? true : false}
          >
            {loading === "pending" ? "Loading" : "Submit"}
          </Button>

          {error ? (
            <p className="text-danger mt-2 font-weight-light">{error}</p>
          ) : (
            ""
          )}
        </Form>
      </Col>
    </Row>
  );
};

export default InsertFlight;
