import * as Yup from "yup";
export function initialValues() {
  return {
    name: "",
    address: "",
    phone: "",
    email: "",
    description: "",
    location: null,
    images: [],
  };
}

export function validationSchema() {
  return Yup.object({
    name: Yup.string().required("Obligatory field"),
    address: Yup.string().required("Obligatory field"),
    phone: Yup.string().required("Obligatory field"),
    email: Yup.string()
      .email("The email entered is not valid")
      .required("Obligatory field"),
    description: Yup.string().required("Obligatory field"),
    location: Yup.object().required("location is required"),
    images: Yup.array()
      .min(1, "At least one image is required")
      .required("image is required"),
  });
}
