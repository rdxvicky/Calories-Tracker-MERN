import React, { Component } from "react";
import {
  adminSessionId,
  getSession,
  userSessionId,
} from "../middlewares/CacheSession";
import * as Action from '../actions/profile';
import * as AuthAction from '../actions/auth';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { Icon, Tooltip, Position } from '@blueprintjs/core';
import { IconNames } from "@blueprintjs/icons";

class Header extends Component {
  state = {
    expectedPerDayIntakeCalorie: undefined
  }
  componentDidMount() {
    if (getSession(userSessionId))
      this.props.getProfile();
  }
  logout = () => {
    if (getSession(userSessionId) && getSession(adminSessionId)) {
      this.props.userLogout();
      this.props.adminLogout();
      return;
    }
    if (getSession(adminSessionId)) {
      this.props.adminLogout();
      return;
    }
    if (getSession(userSessionId)) {
      this.props.userLogout();
      return;
    }
    return;
  }

  render() {
    return (
      <nav className="bp3-navbar bp3-dark">
        <div className="bp3-navbar-group bp3-align-left">
          <div className="bp3-navbar-heading">Calories Tracker</div>
        </div>
        <div className="bp3-navbar-group bp3-align-right">
          {(getSession(adminSessionId) || getSession(userSessionId)) 
          ? (
          <div className="bp3-button">
            {getSession(adminSessionId) ? (
              <div>
                <Link to="/admin">
                  <button className="bp3-button bp3-minimal bp3-icon-home">
                        Admin
                  </button>
                  <span className="bp3-navbar-divider"></span>
                </Link>
              </div>
            ) : null}
            {getSession(userSessionId) ? (
              <div>
                <Link to="/">
                  <button className="bp3-button bp3-minimal bp3-icon-home">
                    Home
              </button>
                  <span className="bp3-navbar-divider"></span>
                </Link>
                <button className="bp3-button bp3-minimal bp3-icon-user" title={this.props.email} >{this.props.profileName}</button>
                <span className="bp3-navbar-divider"></span>
              Expected Calories&nbsp;&nbsp;
                <input
                  onChange={({ target: { value } }) => {
                    this.setState({
                      expectedPerDayIntakeCalorie: Number(value)
                    })
                  }}
                  onKeyUp={({ keyCode }) => {
                    if (keyCode === 13) {
                      this.props.updateProfile('expectedPerDayIntakeCalorie', this.state.expectedPerDayIntakeCalorie || this.props.expectedPerDayIntakeCalorie);
                    }
                  }}
                  title="Expected Intake Calories Per Day"
                  id="form-group-input"
                  type="number"
                  value={
                    this.state.expectedPerDayIntakeCalorie ||
                    this.props.expectedPerDayIntakeCalorie
                  }
                  className="bp3-input"
                  placeholder="Enter Your Password"
                  dir="auto"
                />
                &nbsp;&nbsp;per day
                <span className="bp3-navbar-divider"></span>
              </div>
            ) : null}
            <Tooltip content="LogOut" position={Position.BOTTOM_LEFT} className="bp3-button">
              <Icon icon={IconNames.POWER} iconSize={Icon.SIZE_STANDARD} onClick={() => this.logout()} />
            </Tooltip>
          </div>): null}
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  profileName: state.profile.name,
  email: state.profile.email,
  expectedPerDayIntakeCalorie: state.profile.expectedPerDayIntakeCalorie
});

const mapDispatchToProps = dispatch => ({
  getProfile: () => {
    Action.getProfile()(dispatch);
  },
  updateProfile: (fieldName, fieldValue) => {
    Action.updateProfile(fieldName, fieldValue)(dispatch);
  },
  userLogout: () => {
    AuthAction.userLogout()(dispatch);
  },
  adminLogout: () => {
    AuthAction.adminLogout()(dispatch);
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
