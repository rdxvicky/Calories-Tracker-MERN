import React, { Component } from "react";

import { AnchorButton } from "@blueprintjs/core";
import { connect } from "react-redux";

import * as Actions from "../actions/auth";

class AdminLogin extends Component {
  state = {
    email: "",
    password: "",
  };
  onChange = (fieldName, value) => {
    this.setState({
      [fieldName]: value,
    });
  };

  onLogin() {
    this.props.adminLogin(this.state.email, this.state.password);
  }

  render() {
    return (
      <div>
        <div className="form-container">
          <div className="bp3-form-group">
            <label className="bp3-label" htmlFor="form-group-input">
              Admin Email
              <span className="bp3-text-muted">(required)</span>
            </label>
            <div className="bp3-form-content">
              <div className="bp3-input-group">
                <span className="bp3-icon bp3-icon-envelope"></span>
                <input
                  onChange={({ target: { value } }) =>
                    this.onChange("email", value)
                  }
                  id="form-group-input"
                  type="text"
                  className="bp3-input"
                  placeholder="Enter Your Email id"
                  dir="auto"
                />
              </div>
            </div>

            <label className="bp3-label" htmlFor="form-group-input">
              Password
              <span className="bp3-text-muted">(required)</span>
            </label>
            <div className="bp3-form-content">
              <div className="bp3-input-group">
                <span className="bp3-icon bp3-icon-lock"></span>
                <input
                  onChange={({ target: { value } }) =>
                    this.onChange("password", value)
                  }
                  id="form-group-input"
                  type="password"
                  className="bp3-input"
                  placeholder="Enter Your Password"
                  dir="auto"
                />
              </div>
            </div>

            <br />
            <button
              type="button"
              onClick={() => this.onLogin()}
              className="bp3-button .bp3-intent-success"
            >
              Login
            </button>
            <br />
            <AnchorButton
              href="/signup"
              text="Signup"
              target="_blank"
              minimal
              rightIcon="share"
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  adminLogin: (email, password) =>
    Actions.adminLogin(email, password)(dispatch),
});

export default connect(null, mapDispatchToProps)(AdminLogin);
