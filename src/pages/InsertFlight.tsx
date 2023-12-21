import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  actCreateFlight,
  actCheckingCodeAvailability,
  resetCheckingCodeAvailability,
} from "../store/flights/flightsSlice";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import useFlightValidation from "../hooks/useFlightValidation";
import { Button, Row, Col, Form } from "react-bootstrap";

type FormValues = {
  code: string;
  capacity: number;
  departureDate: string;
  photo?: FileList | null;
};

const InsertFlight = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    imageValidation,
    codeValidation,
    capacityValidation,
    departureDateValidation,
  } = useFlightValidation();

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
    clearErrors,
    formState: { errors },
  } = useForm<FormValues>({
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

  useEffect(() => {
    return () => {
      dispatch(resetCheckingCodeAvailability());
    };
  }, [dispatch]);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    dispatch(actCreateFlight(data))
      .unwrap()
      .then(() => navigate("/home"));
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
      clearErrors("photo");

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      removeImage();
    }
  };

  const removeImage = () => {
    clearErrors("photo");
    setImagePreview(null);
    setValue("photo", null);
  };

  return (
    <>
      <h4 className="mb-4 mt-4">Create New Flight</h4>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Flight Code</Form.Label>
          <Form.Control
            type="text"
            {...register("code", codeValidation)}
            isInvalid={!!errors.code}
            isValid={checkingCodeAvailability === "available" && !errors.code} //to show green flag when code is available
            disabled={checkingCodeAvailability === "pending"} //disable input while do checking
            onBlur={checkCodeAvailabilityHandler}
            onChange={handleCodeChange}
          />
          {checkingCodeAvailability === "pending" ? (
            <Form.Text muted>
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
            {...register("departureDate", departureDateValidation)}
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
            {...register("capacity", capacityValidation)}
            isInvalid={!!errors.capacity}
          />
          <Form.Control.Feedback type="invalid">
            {errors.capacity?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" style={{ position: "relative" }}>
          <Row>
            <Col sm={{ span: 7 }}>
              <Form.Label>
                Photo <span style={{ fontSize: "13px" }}>(optional)</span>
              </Form.Label>
              <Form.Control
                type="file"
                accept="image/png, image/jpeg"
                {...register("photo", imageValidation)}
                isInvalid={!!errors.photo}
                onChange={onPhotoChange}
              />
              {imagePreview ? (
                <Form.Text muted className="mt-1">
                  If you choose a file now and then click cancel, the selected
                  image will be deleted.
                </Form.Text>
              ) : (
                ""
              )}

              <Form.Control.Feedback type="invalid">
                {errors.photo?.message}
              </Form.Control.Feedback>
            </Col>

            {imagePreview ? (
              <div style={{ position: "absolute", right: "0", width: "auto" }}>
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{ maxWidth: "100%", maxHeight: "150px" }}
                />
                <button className="btn btn-close" onClick={removeImage} />
              </div>
            ) : (
              ""
            )}
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
