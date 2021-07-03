import { Provider } from "react-redux";
import { BrowserRouter, Redirect, Route } from "react-router-dom";

import { store } from "./store/store";
import { SignIn } from "./components/pages/AuthPage/SignIn";
import { SignUp } from "./components/pages/AuthPage/SignUp";

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Route exact path="/" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Redirect from="*" to="/" />
      </BrowserRouter>
    </Provider>
  );
};
