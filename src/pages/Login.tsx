import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { actLogin, resetErrorMsg } from "../store/auth/authSlice";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../util/authSchema";

import { Button, Form } from "react-bootstrap";

type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const abortControllerRef = useRef<null | { abort: () => void }>(null);
  const { loading, error } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    abortControllerRef.current = dispatch(
      actLogin({
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
      <h4 className="mb-4">Login</h4>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
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

        <Form.Group className="mb-3" controlId="formBasicPassword">
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
            <Link to="/register">Don't have an account yet? Register now</Link>
          </div>
        ) : (
          ""
        )}
      </Form>
    </>
  );
};

export default Login;
