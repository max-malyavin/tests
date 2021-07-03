import { hashSync, compareSync } from "bcryptjs";
// import jwt from "jsonwebtoken";

const UserCtrl = {
  create(schema, request) {
    const data = JSON.parse(request.requestBody);

    const user = schema.all("user").models.find((model) => model.attrs.email === data.email);

    if (user) {
      return {
        error: "Пользователь с таким email уже существует.",
      };
    }

    const newPassword = hashSync(data.password, 8);

    schema.create("user", {
      ...data,
      password: newPassword,
    });

    // const token = jwt.sign({ email: data.email }, SECRET_KEY);
    const token = "123";

    return {
      data: {
        email: data.email,
        token,
      },
      status: "Успешно",
    };
  },
  login(schema, request) {
    const data = JSON.parse(request.requestBody);
    console.log(schema.all("user"), "s", data);
    const user = schema.all("user").models.find((model) => model.attrs.email === data.email);

    if (!user) {
      return {
        error: "Нет пользователя с таким email.",
      };
    }

    const validatedPassword = compareSync(data.password, user.attrs.password);

    if (!validatedPassword) {
      return {
        error: "Неверные email или пароль",
      };
    }

    // const token = jwt.sign({ email: data.email }, SECRET_KEY);
    const token = "123";

    return {
      data: {
        email: user.email,
        token,
      },
      status: "Успешно",
    };
  },

  logout(schema, request) {},
};
export default UserCtrl;
