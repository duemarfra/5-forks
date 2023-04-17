import * as Yup from "yup";

export function initialValues() {
  return {
    email: "",
    password: "",
  };
}

export function validationSchema() {
  return Yup.object({
    email: Yup.string()
      .email("This email isn't valid")
      .required("email is required"),
    password: Yup.string().required("password is required"),
  });
}
