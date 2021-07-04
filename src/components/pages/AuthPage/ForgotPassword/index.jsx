import { useDispatch, useSelector } from "react-redux";
import { FormikProvider } from "formik";

import { forgot } from "@/store/ducks/user/reducer";
import { AddEventForm } from "@/components/form-config/add-event-form";
import { userSelectors } from "@/store/ducks/user/selectors";
import { LayoutAuth } from "../../LayoutAuth";
import { InputField } from "@/components/form-config/Input";
import { ButtonField } from "@/components/form-config/Button";

export const ForgotPassword = () => {
  const user = useSelector(userSelectors.userData);
  const isLoading = useSelector(userSelectors.isLoading);
  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    dispatch(forgot(values));
    onClose();
  };

  const { onClose, formik } = AddEventForm(onSubmit, {});
  return (
    <LayoutAuth>
      <LayoutAuth.Title>
        <h1> Забыли пароль?</h1>
      </LayoutAuth.Title>
      <LayoutAuth.Form>
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <InputField
              name="email"
              type="email"
              label="Почта"
              placeholder="Email"
              disabled={isLoading}
            />

            <ButtonField
              style={{ marginTop: "10px" }}
              className="contact__form__btn"
              type="submit"
              disabled={isLoading}
            >
              Восстановить
            </ButtonField>

            {isLoading && <span>Загрузка...</span>}
          </form>
        </FormikProvider>
        <div style={{ fontSize: "20px", padding: "10px" }}>{user && JSON.stringify(user.data)}</div>
      </LayoutAuth.Form>
    </LayoutAuth>
  );
};
