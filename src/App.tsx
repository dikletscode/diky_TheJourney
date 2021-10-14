import React, { useContext, useEffect } from "react";
import { setAuthToken } from "./config/axios";
import "./App.css";
import HomePage from "./pages/HomePage";
import Header from "./components/header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Profile from "./pages/profile";
import Journey from "./pages/Journey";
import PrivateRoute from "./config/private";
import { UserContext } from "./context/provider";
import AddJourney from "./pages/AddJourney";
import Bookmark from "./pages/Bookmark";
import EditJourney from "./pages/EditJourney";

function App() {
  const loginUser = localStorage.getItem("_user");
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    if (loginUser) {
      const data = JSON.parse(loginUser);
      setAuthToken(data.token);
      dispatch({ type: "VALID_USER", payload: data.user });
    } else {
      setAuthToken(null);
      dispatch({ type: "INVALID_USER", payload: null });
    }
  }, [loginUser]);
  if (state.isLogin == null) {
    return <></>;
  }

  return (
    <Router>
      <Header />
      <Switch>
        <Route component={HomePage} path="/" exact />
        <PrivateRoute component={AddJourney} path="/user/journey" exact />
        <PrivateRoute
          component={EditJourney}
          path="/user/edit/journey/:id"
          exact
        />
        <PrivateRoute component={Profile} path="/profile" exact />
        <PrivateRoute component={Bookmark} path="/bookmark" exact />
        <PrivateRoute component={Journey} path="/post/:id" exact />
      </Switch>
    </Router>
  );
}

export default App;
