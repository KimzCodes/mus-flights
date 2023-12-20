import * as yup from "yup";

export const flightSchema = yup.object().shape({
  photo: yup
    .mixed()
    .required("Please upload an image")
    .test(
      "fileSize",
      "File is too large",
      (value) => value && value.size <= 2 * 1024 * 1024 // 2MB in bytes
    )
    .test(
      "fileType",
      "Only images allowed",
      (value) => value && value.type.startsWith("image/")
    ),
  // file: yup
  //   .mixed()
  //   .test("file", "Please select a file", (value) => {
  //     return Boolean(value && (value as FileList)[0] instanceof File);
  //   })
  //   .test("fileType", "Invalid file type, only images are allowed", (value) => {
  //     return Boolean(value && (value as FileList)[0].type.startsWith("image/"));
  //   })
  //   .test("fileSize", "File size must be less than 5MB", (value) => {
  //     return Boolean(value && (value as FileList)[0].size <= 5 * 1024 * 1024);
  //   })
  //   .required(),
});
