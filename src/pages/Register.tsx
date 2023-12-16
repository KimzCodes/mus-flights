import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { actRegister, resetErrorMsg } from "../store/auth/authSlice";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../util/authSchema";
import { Button, Form } from "react-bootstrap";

type FormValues = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

const Register = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const abortControllerRef = useRef<null | { abort: () => void }>(null);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    abortControllerRef.current = dispatch(
      actRegister({
        name: data.name,
        email: data.email,
        password: data.password,
      })
    );
  };

  useEffect(() => {
    return () => {
      if (abortControllerRef.current && abortControllerRef.current.abort) {
        abortControllerRef.current.abort();
      }

      dispatch(resetErrorMsg());
    };
  }, [dispatch]);

  return (
    <>
      <h4 className="mb-4">Register</h4>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            {...register("name")}
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            {...register("email")}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            {...register("password")}
            isInvalid={!!errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password Confirm</Form.Label>
          <Form.Control
            type="password"
            {...register("passwordConfirm")}
            isInvalid={!!errors.passwordConfirm}
          />
          <Form.Control.Feedback type="invalid">
            {errors.passwordConfirm?.message}
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

        {loading !== "pending" ? (
          <div style={{ fontSize: "14px", marginTop: "8px" }}>
            <Link to="/">Already have account</Link>
          </div>
        ) : (
          ""
        )}
      </Form>
    </>
  );
};

export default Register;
