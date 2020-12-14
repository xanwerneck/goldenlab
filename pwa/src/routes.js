import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { isAuthenticated } from "./utils/auth";
import BoasVindas from "./pages/BoasVindas";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Maquina from "./pages/Maquina";
import ChatBot from "./pages/ChatBot";
import Painel from "./pages/Painel";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/login" component={Login} />
      <PrivateRoute path="/inicio" component={Home} />
      <PrivateRoute path="/maquina" component={Maquina} />
      <PrivateRoute path="/chatbot" component={ChatBot} />
      <PrivateRoute path="/painel" component={Painel} />
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;