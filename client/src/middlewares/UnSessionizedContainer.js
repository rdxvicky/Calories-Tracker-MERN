import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import { adminSessionId, getSession, userSessionId } from "./CacheSession";

class UnSessionizedContainer extends Component {
  render() {
    const { ...rest } = this.props;
    const userSession = getSession(userSessionId);
    const adminSession = getSession(adminSessionId);

    if (userSession) return <Redirect to="/" />;
    if (adminSession) return <Redirect to="/admin" />;

    return <Route {...rest} />;
  }
}


export default UnSessionizedContainer;
