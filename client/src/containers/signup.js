import React, { Component } from "react";
import * as Actions from "../actions/auth";
import { connect } from "react-redux";
import { AnchorButton } from "@blueprintjs/core";

class Signup extends Component {
  state = {
    email: "",
    password: "",
    name: "",
  };
  onChange = (fieldName, value) => {
    this.setState({
      [fieldName]: value,
    });
  };

  onSignUp() {
    this.props.signUp(this.state.email, this.state.name, this.state.password);
  }
  render() {
    return (
      <div className="form-container">
        <div className="bp3-form-group">
          <label className="bp3-label" htmlFor="form-group-input">
            Name
            <span className="bp3-text-muted">(required)</span>
          </label>
          <div className="bp3-form-content">
            <div className="bp3-input-group">
              <span className="bp3-icon bp3-icon-user"></span>
              <input
                onChange={({ target: { value } }) => {
                  this.onChange("name", value);
                }}
                id="form-group-input"
                type="text"
                className="bp3-input"
                placeholder="Enter Your Username"
                dir="auto"
              />
            </div>
          </div>

          <label className="bp3-label" htmlFor="form-group-input">
            Email
            <span className="bp3-text-muted">(required)</span>
          </label>
          <div className="bp3-form-content">
            <div className="bp3-input-group">
              <span className="bp3-icon bp3-icon-envelope"></span>
              <input
                onChange={({ target: { value } }) => {
                  this.onChange("email", value);
                }}
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
              <span className="bp3-icon bp3-icon-user"></span>
              <input
                onChange={({ target: { value } }) => {
                  this.onChange("password", value);
                }}
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
            onClick={() => this.onSignUp()}
            className="bp3-button .bp3-intent-success"
          >
            Signup
          </button>
                <br />
          <AnchorButton
              href="/login"
              text="Login Here"
              target="_blank"
              minimal
              rightIcon="share"
            />

        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  signUp: (email, name, password) =>
    Actions.signUp(email, name, password)(dispatch),
});

export default connect(null, mapDispatchToProps)(Signup);
