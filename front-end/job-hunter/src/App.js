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
import EmployerDashBoard from "./pages/Employer/EmployerDashBoard";
import JobPostDetail from "./pages/Employer/JobPostDetail";
import JobDashBoard from "./pages/JobSeeker/JobDashBoard";
import Background from "./pages/Background";

if (localStorage.getItem("jwtToken")) {
  const decode = jwt_decode(localStorage.getItem("jwtToken"));
  store.dispatch({
    type: "SET_CURRENT_USER",
    payload: decode,
  });
  setJWTToken(localStorage.getItem("jwtToken"));
}
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/signup/:userType" component={SignUp} />
        <Route exact path="/signin/:userType" component={SignIn} />

        <Switch>
          <SecuredRoute
            exact
            path="/employer/createPost"
            role="EMPLOYER"
            component={JobPost}
          />
        </Switch>
        <Switch>
          <SecuredRoute
            exact
            path="/employer/dashboard"
            role="EMPLOYER"
            component={EmployerDashBoard}
          />
          <SecuredRoute
            exact
            path="/employer/postDetail/"
            role="EMPLOYER"
            component={JobPostDetail}
          />
          <SecuredRoute
            exact
            path="/jobseeker/dashboard/"
            role="JOB_SEEKER"
            component={JobDashBoard}
          />
          <SecuredRoute
            exact
            path="/jobseeker/createBackground/"
            role="JOB_SEEKER"
            component={Background}
          />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
