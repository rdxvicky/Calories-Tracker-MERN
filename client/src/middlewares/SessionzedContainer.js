import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { adminSessionId, getSession, userSessionId } from "./CacheSession";
import { verifyUserSession } from "../actions/auth";

class SessionzedContainer extends Component {
  componentWillMount() {
    const userSession = getSession(userSessionId);
    const adminSession = getSession(adminSessionId);

    if (!!(userSession || adminSession)) {
      this.props.verifyUserSession(adminSession || userSession);
    }
  }

  render() {
    const { ...rest } = this.props;
    const userSession = getSession(userSessionId);
    const adminSession = getSession(adminSessionId);

    if (!(userSession || adminSession)) {
      return <Redirect to="/login" />;
    } else {
      return <Route {...rest} />;
    }
  }
}

const mapDispatchToProps = (dispatch) => ({
  verifyUserSession: (sessionId) => verifyUserSession(sessionId)(dispatch),
});

export default connect(null, mapDispatchToProps)(SessionzedContainer);
