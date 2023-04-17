import * as Yup from "yup";

export function initialValues() {
  return {
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  };
}

export function validationSchema() {
  const textAlert = "This field is required";
  return Yup.object({
    password: Yup.string().required(textAlert),
    newPassword: Yup.string().required(textAlert),
    confirmNewPassword: Yup.string()
      .required(textAlert)
      .oneOf([Yup.ref("newPassword"), "The News Passwords don't match"]),
  });
}
