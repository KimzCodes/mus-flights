import * as yup from "yup";

export const flightSchemaEdit = yup.object().shape({
  capacity: yup
    .number()
    .required("Capacity is required")
    .positive("Capacity must be a positive number")
    .max(200, "Maximum capacity is 200")
    .transform((value, originalValue) => {
      return originalValue === "" ? undefined : value;
    }),

  departureDate: yup
    .string()
    .transform((originalValue) => {
      // Check if the original value is defined
      if (originalValue) {
        // Transform to YYYY-MM-DD
        const date = new Date(originalValue);
        return date.toISOString().split("T")[0];
      }
      // Return an empty string or handle undefined as needed
      return "";
    })
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)")
    .required("Date is required"),
});
