import * as Yup from "yup";
export function initialValues() {
  return {
    title: "",
    comment: "",
    rating: 3,
  };
}

export function validationSchema() {
  return Yup.object({
    title: Yup.string().required("Obligatory field"),
    comment: Yup.string().required("Obligatory field"),
    rating: Yup.number().required("Obligatory field"),
  });
}
