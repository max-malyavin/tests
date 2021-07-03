import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FormikProvider } from "formik";

import { login } from "@/store/ducks/user/reducer";
import { userSelectors } from "@/store/ducks/user/selectors";
import { InputField } from "@/components/form-config/Input";
import { AddEventForm } from "@/components/form-config/add-event-form";
import { ButtonField } from "@/components/form-config/Button";
import { LayoutAuth } from "../../LayoutAuth";

export function SignIn() {
  const user = useSelector(userSelectors.userData);
  const isLoading = useSelector(userSelectors.isLoading);
  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    dispatch(login(values));
    onClose();
  };
  const { onClose, formik } = AddEventForm(onSubmit, {});
  console.log(user, " user");
  return (
    <LayoutAuth>
      <LayoutAuth.Title>
        <h1>Вход</h1>
        <p>Пожалуйста,войдите в свой аккаунт</p>
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

            <ButtonField className="contact__form__btn" type="submit" disabled={isLoading}>
              Логин
            </ButtonField>

            {isLoading && <span>Загрузка...</span>}
            <hr />
            <Link to="/signup">
              <button>Создать новый аккаунт</button>
            </Link>
          </form>
        </FormikProvider>
        <div style={{ fontSize: "20px", padding: "10px" }}>{user && JSON.stringify(user.data)}</div>
      </LayoutAuth.Form>
    </LayoutAuth>
  );
}
