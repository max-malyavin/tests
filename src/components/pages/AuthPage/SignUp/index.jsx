import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FormikProvider } from "formik";

import { LayoutAuth } from "../../LayoutAuth";
import { InputField } from "@/components/form-config/Input";
import { ButtonField } from "@/components/form-config/Button";
import { userSelectors } from "@/store/ducks/user/selectors";
import { AddEventForm } from "@/components/form-config/add-event-form";
import { register } from "@/store/ducks/user/reducer";

export function SignUp() {
  const isLoading = useSelector(userSelectors.isLoading);
  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    dispatch(register(values));
    onClose();
  };
  const { onClose, formik } = AddEventForm(onSubmit, {});
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
            <Link to="/">
              <button>У меня уже есть аккаунт</button>
            </Link>
          </form>
        </FormikProvider>
      </LayoutAuth.Form>
    </LayoutAuth>
  );
}
