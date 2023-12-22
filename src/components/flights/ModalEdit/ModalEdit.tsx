import { memo, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { actEditFlight } from "../../../store/flights/flightsSlice";
import { useForm, SubmitHandler } from "react-hook-form";
import useFlightValidation from "../../../hooks/useFlightValidation";

import { Modal, Button, Form } from "react-bootstrap";
import { IFlight } from "../../../types/Flight";

type Props = {
  showDialog: boolean;
  setShowDialog: (value: boolean) => void;
  flightData: IFlight | null;
};

type FormValues = {
  code?: string;
  capacity: number;
  departureDate: string;
  photo?: FileList | null;
  flightHasImage?: boolean;
};

const ModalEdit = memo(({ showDialog, setShowDialog, flightData }: Props) => {
  const dispatch = useAppDispatch();
  const { editLoading, error } = useAppSelector((state) => state.flights);
  const [uploadImagePreview, setUploadImagePreview] = useState<string | null>(
    null
  );
  //flight has an image from db and set ability to remove it
  const [flightHasImage, setFlightHasImage] = useState<boolean>(false);
  const { imageValidation, capacityValidation, departureDateValidation } =
    useFlightValidation();

  const {
    reset,
    handleSubmit,
    register,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({ mode: "onBlur" });

  //fill form inputs
  useEffect(() => {
    reset({
      code: flightData?.code,
      capacity: flightData?.capacity,
      departureDate: flightData?.departureDate,
    });
    if (flightData?.img) {
      setFlightHasImage(true);
    }
    return () => {
      setFlightHasImage(false);
    };
  }, [flightData, reset]);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    dispatch(
      actEditFlight({
        id: flightData?.id ? flightData?.id : "",
        code: data?.code ? data?.code : "",
        departureDate: data.departureDate,
        capacity: +data?.capacity,
        photo: data.photo,
      })
    )
      .unwrap()
      .then(() => {
        setShowDialog(false);
      });
  };

  const onPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      clearErrors("photo");

      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      removeImage();
    }
  };

  const removeImage = () => {
    clearErrors("photo");
    setUploadImagePreview(null);
    setValue("photo", null);
  };

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
          {!flightHasImage ? (
            <>
              <Form.Group className="mb-3" style={{ position: "relative" }}>
                <Form.Label>
                  Photo <span style={{ fontSize: "13px" }}>(Replace)</span>
                </Form.Label>
                <Form.Control
                  type="file"
                  accept="image/png, image/jpeg"
                  {...register("photo", imageValidation)}
                  isInvalid={!!errors.photo}
                  onChange={onPhotoChange}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.photo?.message}
                </Form.Control.Feedback>
                {uploadImagePreview ? (
                  <Form.Text muted className="mt-1">
                    If you choose a file now and then click cancel, the selected
                    image will be deleted.
                  </Form.Text>
                ) : (
                  ""
                )}
              </Form.Group>
              {uploadImagePreview ? (
                <div className="mb-3">
                  <img
                    src={uploadImagePreview}
                    style={{ maxWidth: "100%", maxHeight: "150px" }}
                    alt="preview"
                  />

                  <button className="btn btn-close" onClick={removeImage} />
                </div>
              ) : (
                ""
              )}
            </>
          ) : (
            <div className="mb-3">
              <img
                src={`http://localhost:3000/flights/${flightData?.id}/photo`}
                style={{ maxWidth: "100%", maxHeight: "150px" }}
                alt="preview"
              />
              <button
                className="btn btn-close"
                onClick={() => setFlightHasImage(false)}
              />
            </div>
          )}

          <Button
            variant="primary"
            type="submit"
            disabled={editLoading === "pending" ? true : false}
            style={{
              display: "inline-block",
              marginRight: "3px",
            }}
          >
            {editLoading === "pending" ? "Loading" : "Save Updates"}
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
