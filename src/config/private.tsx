import { ComponentType, useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { UserContext } from "../context/provider";

export type ProtectedRouteProps = {
  path: string;
  exact?: boolean;
  component: ComponentType<any>;
};

const PrivateRoute = ({
  component: Component,

  ...rest
}: ProtectedRouteProps) => {
  let user = localStorage.getItem("_user");
  const isLogin = () => {
    if (user) {
      let token = JSON.parse(user).token;
      if (token) return true;
    }
    return false;
  };

  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin() ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};
export default PrivateRoute;
