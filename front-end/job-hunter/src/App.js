import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home/Home";
import SignUp from "./pages/SignUp/SignUp";
import SignIn from "./pages/SignIn/SignIn";
import store from "./store";
import setJWTToken from "./auth/setJWTToken";
import jwt_decode from "jwt-decode";
import { signout } from "./action/securityActions";
import JobPost from "./pages/Employer/JobPost";
import SecuredRoute from "./auth/SecuredRoute";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./bootstrap-4.3.1-dist/css/bootstrap.min.css";

const jwtToken = localStorage.getItem("jwtToken");
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/signup/:userType" component={SignUp} />
        <Route exact path="/signin/:userType" component={SignIn} />
        <Route exact path="/employer/createPost" component={JobPost} />
        {/* <Switch>
          <SecuredRoute
            exact
            path="/employer/createPost"
            role="ROLE_EMPLOYER"
            component={JobPost}
          />
        </Switch> */}
      </Router>
    </Provider>
  );
}

export default App;
