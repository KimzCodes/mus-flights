import { RegisterOptions } from "react-hook-form";

const nameValidation: RegisterOptions = {
  required: "Name is required",
  minLength: {
    value: 3,
    message: "Name must be at least 3 characters",
  },
  maxLength: {
    value: 50,
    message: "Name must not exceed 50 characters",
  },
};

const passwordValidation: RegisterOptions = {
  required: "Password is required",
  minLength: {
    value: 6,
    message: "Password must be at least 8 characters long",
  },
  pattern: {
    value: /.*[!@#$%^&*()_+{}|[\]\\:";'<>?,./].*/,
    message: "Must contain at least one special character",
  },
};

const emailValidation: RegisterOptions = {
  required: "Email is required",
  pattern: {
    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: "Invalid email address",
  },
};

const loginPasswordValidation: RegisterOptions = {
  required: "Password is required",
};

const useAuthValidation = () => {
  return {
    loginPasswordValidation,
    emailValidation,
    nameValidation,
    passwordValidation,
  };
};

export default useAuthValidation;
