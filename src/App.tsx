import { Provider } from "react-redux";
import { BrowserRouter, Redirect, Switch, Route } from "react-router-dom";

import { store } from "./store/store";
import { SignIn } from "./components/pages/AuthPage/SignIn";
import { SignUp } from "./components/pages/AuthPage/SignUp";
import { ForgotPassword } from "./components/pages/AuthPage/ForgotPassword";
import { NotFound } from "./components/pages/NotFound";

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route exact path="/forgot_password" component={ForgotPassword} />
          <Route path="*" component={NotFound} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};
