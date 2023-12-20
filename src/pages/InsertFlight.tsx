import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  actCreateFlight,
  actCheckingCodeAvailability,
} from "../store/flights/flightsSlice";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { flightSchema } from "../util/flightSchema";
import { Button, Row, Col, Form } from "react-bootstrap";

type FileType = {
  name: string;
  size: number;
  type: string;
};

type FormValues = {
  code: string;
  capacity: number;
  departureDate: string;
  photo: FileType;
};

const InsertFlight = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, checkingCodeAvailability } = useAppSelector(
    (state) => state.flights
  );

  const [fireCheckCodeAvailability, setFireCheckCodeAvailability] =
    useState(true);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    handleSubmit,
    register,
    getFieldState,
    trigger,
    setValue,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver<FormValues>(flightSchema),
    mode: "onBlur",
  });

  useEffect(() => {
    if (checkingCodeAvailability === "unavailable") {
      setError("code", {
        type: "custom",
        message: "Code is already existing, please try again",
      });
    }
  }, [checkingCodeAvailability, setError]);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    dispatch(actCreateFlight(data));
    // .unwrap()
    // .then(() => navigate("/home"));
  };

  //This function will detect if any changes occur while the user is focused on the input.
  //if yes setFireCheckCodeAvailability -> true
  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue("code", value);
    setFireCheckCodeAvailability(true);
  };

  //This function will detect if user left input and determines if there is code available for use or not."
  //function will fire onblur with condition: validation is passed and there is a change happen in code input

  //That means "Check Code Availability Handler" and "Handle Code Change" are connected to change the "setFireCheckCodeAvailability" value from false to true.

  const checkCodeAvailabilityHandler = async (
    e: React.FocusEvent<HTMLInputElement>
  ) => {
    await trigger("code");
    const value = e.target.value;
    const status = getFieldState("code");

    if (!status.invalid && fireCheckCodeAvailability) {
      setFireCheckCodeAvailability(false);
      dispatch(actCheckingCodeAvailability(value)).unwrap();
    }
  };

  const onPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <>
      <h4 className="mb-4 mt-4">Create New Flight</h4>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Flight Code</Form.Label>
          <Form.Control
            type="text"
            {...register("code")}
            isInvalid={!!errors.code}
            isValid={checkingCodeAvailability === "available" && !errors.code} //to show green flag when code is available
            disabled={checkingCodeAvailability === "pending"} //disable input while do checking
            onBlur={checkCodeAvailabilityHandler}
            onChange={handleCodeChange}
          />
          {checkingCodeAvailability === "pending" ? (
            <Form.Text id="passwordHelpBlock" muted>
              Verifying code availability, please wait...
            </Form.Text>
          ) : (
            ""
          )}
          <Form.Control.Feedback type="valid">
            Looks good!
          </Form.Control.Feedback>

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

        <Form.Group className="mb-3" style={{ position: "relative" }}>
          <Row>
            <Col sm={{ span: 7 }}>
              <Form.Label>Photo</Form.Label>
              <Form.Control
                type="file"
                {...register("photo")}
                isInvalid={!!errors.photo}
                onChange={onPhotoChange}
              />
              <Form.Control.Feedback type="invalid">
                {errors.photo?.message}
              </Form.Control.Feedback>
            </Col>
            <div style={{ position: "absolute", right: "0", width: "auto" }}>
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{ maxWidth: "100%", maxHeight: "100px" }}
                />
              )}
            </div>
          </Row>
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          disabled={
            loading === "pending"
              ? true
              : checkingCodeAvailability === "pending"
              ? true
              : false
          }
        >
          {loading === "pending" ? "Loading" : "Submit"}
        </Button>

        {error ? (
          <p className="text-danger mt-2 font-weight-light">{error}</p>
        ) : (
          ""
        )}
      </Form>
    </>
  );
};

export default InsertFlight;
