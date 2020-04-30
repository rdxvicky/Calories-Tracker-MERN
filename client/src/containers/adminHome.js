import React, { Component } from "react";
import { Button, Card, Elevation, ButtonGroup } from "@blueprintjs/core";

import { getAllUserProfiles, updateUserProfile } from '../actions/admin';
import { createUserSession } from '../actions/auth';
import { connect } from "react-redux";

class AdminHome extends Component {
  componentDidMount() {
    this.props.getAllUserProfiles();
  }
  render() {
    const { isSavedUserProfiles, savedUserProfiles } = this.props;

    if (isSavedUserProfiles) {
      return null;
    }

    return (
      <div className="container">
        <h1>Featching All The Users</h1>
        {
          savedUserProfiles.length
          ? (
            savedUserProfiles.map((savedUserProfile, index) => (
              <div key={index}>
                <Card interactive={true} elevation={Elevation.TWO}>
                  <label className="bp3-control bp3-switch bp3-large" align="right">
                    <input type="checkbox" checked={savedUserProfile.isActive} onChange={({target: {value}}) => {
                      this.props.updateUserProfile(savedUserProfile._id, 'isActive', !savedUserProfile.isActive);
                    }} />
                    <span className="bp3-control-indicator"></span>
                      User Activation
                  </label>
                  <h1>{savedUserProfile.userName}</h1>
                  <span>{savedUserProfile.userEmail}</span>

                  <div align="right">
                    <ButtonGroup>
                      {/* <Button text="Delete" /> */}
                      <Button text="Click To View Profile" onClick={() => this.props.createUserSession(savedUserProfile._id)} />
                    </ButtonGroup>
                  </div>
                </Card>
                <br />
              </div>
            ))
            ) : (
              <div>No Data Available</div>
            )
          }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  savedUserProfiles: state.profile.savedUserProfiles,
  isSavedUserProfiles: state.profile.isSavedUserProfiles,
});

const mapDispatchToProps = dispatch => ({
  getAllUserProfiles: () => {
    getAllUserProfiles()(dispatch);
  },
  updateUserProfile: (userId, fieldName, fieldValue) => {
    updateUserProfile(userId, fieldName, fieldValue)(dispatch);
  },
  createUserSession: (userId) => {
    createUserSession(userId)(dispatch);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminHome);
