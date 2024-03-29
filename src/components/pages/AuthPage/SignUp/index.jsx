import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FormikProvider } from "formik";

import { LayoutAuth } from "../../LayoutAuth";
import { InputField } from "@/components/form-config/Input";
import { ButtonField } from "@/components/form-config/Button";
import { userSelectors } from "@/store/ducks/user/selectors";
import { AddEventForm } from "@/components/form-config/add-event-form";
import { register } from "@/store/ducks/user/reducer";
import { validationPassword } from "@/components/form-config/add-event-form";

export function SignUp() {
  const user = useSelector(userSelectors.userData);
  const isLoading = useSelector(userSelectors.isLoading);
  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    dispatch(register(values));
    onClose();
  };
  const { onClose, formik } = AddEventForm(onSubmit, { password: "" }, validationPassword);
  return (
    <LayoutAuth>
      <LayoutAuth.Title>
        <h1>Регистрация</h1>
        <p>Пожалуйста,создайте свой аккаунт</p>
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
            <InputField
              name="password"
              type="password"
              label="Пароль"
              placeholder="Пароль"
              disabled={isLoading}
            />

            <ButtonField type="submit" disabled={isLoading}>
              Зарегистрироваться
            </ButtonField>

            {isLoading && <span>Загрузка...</span>}
            <hr />
            <Link to="/">У меня уже есть аккаунт</Link>
          </form>
        </FormikProvider>
        <div style={{ fontSize: "20px", padding: "10px" }}>{user && JSON.stringify(user.data)}</div>
      </LayoutAuth.Form>
    </LayoutAuth>
  );
}
