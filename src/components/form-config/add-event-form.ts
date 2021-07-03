import { FormikHelpers, useFormik } from "formik";
import * as Yup from "yup";

export interface AddEventFormValues {
  email: string;
  year: string;
  type: string;
  placeholder: string;
  label: string;
}

export const AddEventForm = (
  onSubmit: (
    values: AddEventFormValues,
    formikHelpers?: FormikHelpers<AddEventFormValues>
  ) => void | Promise<any>,
  intialValues?: Partial<AddEventFormValues>
): any => {
  const onClose = () => {
    formik.resetForm();
  };

  const formik = useFormik<any>({
    initialValues: {
      email: "",
      password: "",
      ...intialValues,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Введите корректный email").required("Введите email"),
      password: Yup.string().required("Введите пароль"),
    }),
    // onSubmit(values) {
    //   onSubmit(values);
    //   onClose();
    // },
    onSubmit,
  });
  // console.log(formik);
  return { onClose, formik };
};
