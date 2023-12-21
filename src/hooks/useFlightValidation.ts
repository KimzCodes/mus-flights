import { RegisterOptions } from "react-hook-form";

const codeValidation: RegisterOptions = {
  required: "Flight Code is required",
  pattern: {
    value: /^[a-zA-Z]{6}$/,
    message: "Flight Code should be 6 characters long and contain only letters",
  },
};

const capacityValidation: RegisterOptions = {
  required: "Capacity is required",
  min: {
    value: 1,
    message: "Capacity should be greater than 0",
  },
  max: {
    value: 200,
    message: "Capacity should be less than 200",
  },
};

const departureDateValidation: RegisterOptions = {
  required: "Departure Date is required",
  pattern: {
    value: /^\d{4}-\d{2}-\d{2}$/,
    message: "Invalid date format (YYYY-MM-DD)",
  },
  validate: (value) => {
    const currentDate = new Date();
    const selectedDate = new Date(value);
    currentDate.setHours(0, 0, 0, 0); // Set time to midnight for comparison

    if (selectedDate <= currentDate) {
      return "Departure Date should be in the future";
    }
    return true;
  },
};

const imageValidation: RegisterOptions = {
  validate: (value) => {
    if (
      !value ||
      typeof value !== "object" ||
      !("length" in value) ||
      value.length === 0
    ) {
      // No file provided, validation is successful
      return true;
    }

    const file = value[0] as File;
    const allowedTypes = ["image/jpeg", "image/png"];

    if (!allowedTypes.includes(file.type)) {
      return "File type not supported. Please upload a JPEG or PNG image.";
    }

    if (file.size > 2 * 1024 * 1024) {
      return "File size should be less than 2MB.";
    }

    return true;
  },
};

const useFlightValidation = () => {
  return {
    imageValidation,
    codeValidation,
    capacityValidation,
    departureDateValidation,
  };
};

export default useFlightValidation;
