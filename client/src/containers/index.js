import React from "react";
import {
  BrowserRouter as Router,
  Switch,

} from "react-router-dom";
import "../index.css";

import Login from "./login";
import AdminLogin from './adminLogin';
import ResetPassword from "./resetpassword";
import Signup from "./signup";
import Home from "./home";
import AdminHome from "./adminHome";
import Header from "../components/Header";
import UnAuthHeader from '../components/UnAuthHeader';
import Footer from "../components/Footer";
import SessionzedContainer from "../middlewares/SessionzedContainer";
import UnSessionizedContainer from "../middlewares/UnSessionizedContainer";

const App = () => (
  <Router>
    <Switch>
      <UnSessionizedContainer
        path="/login"
        exact
        component={() => (
          <div>
            <UnAuthHeader />
            <Login />
            <Footer />
          </div>
        )}
      />
      <UnSessionizedContainer
        path="/signup"
        exact
        component={() => (
          <div>
            <UnAuthHeader />
            <Signup />
            <Footer />
          </div>
        )}
      />
      <SessionzedContainer
        path="/"
        exact
        component={() => (
          <div>
            <Header />
            <Home />
            <Footer />
          </div>
        )}
      />
      <SessionzedContainer
        path="/admin"
        exact
        component={() => (
          <div>
            <Header />
            <AdminHome />
            <Footer />
          </div>
        )}
      />
      <UnSessionizedContainer
        path="/resetpassword"
        exact
        component={() => (
          <div>
            <UnAuthHeader />
            <ResetPassword />
            <Footer />
          </div>
        )}
      />
      <UnSessionizedContainer
        path="/admin/login"
        exact
        component={() => (
          <div>
            <Header />
            <AdminLogin />
            <Footer />
          </div>
        )}
      />
    </Switch>
  </Router>
);

export default App;
