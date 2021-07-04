import { FormikHelpers, useFormik } from "formik";
import * as Yup from "yup";

export interface AddEventFormValues {
  email: string;
  year: string;
  type: string;
  placeholder: string;
  label: string;
}
export const validationPassword = { password: Yup.string().required("Введите пароль") };

export const AddEventForm = (
  onSubmit: (
    values: AddEventFormValues,
    formikHelpers?: FormikHelpers<AddEventFormValues>
  ) => void | Promise<any>,
  intialValues?: Partial<AddEventFormValues>,
  validations?: any
): any => {
  const onClose = () => {
    formik.resetForm();
  };

  const formik = useFormik<any>({
    initialValues: {
      email: "",
      ...intialValues,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Введите корректный email").required("Введите email"),
      ...validations,
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
