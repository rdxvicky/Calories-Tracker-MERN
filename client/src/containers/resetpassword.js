import React, { Component } from 'react';

class ResetPassword extends Component {
    render() {
        return (
            <div>
            <div className="form-container">
            <div className="bp3-form-group">
              <label className="bp3-label" htmlFor="form-group-input">
                New Password
                <span className="bp3-text-muted">(required)</span>
              </label>
              <div className="bp3-form-content">
                <div className="bp3-input-group">
                  <span className="bp3-icon bp3-icon-lock"></span>
                  <input
                    id="form-group-input"
                    type="password"
                    className="bp3-input"
                    placeholder="Enter Your New Password"
                    dir="auto"
                  />
                </div>
              </div>
    
              <label className="bp3-label" htmlFor="form-group-input">
              Confrim Password
              <span className="bp3-text-muted">(required)</span>
            </label>
            <div className="bp3-form-content">
              <div className="bp3-input-group">
                <span className="bp3-icon bp3-icon-lock"></span>
                <input
                  id="form-group-input"
                  type="password"
                  className="bp3-input"
                  placeholder="Confrim Your Password"
                  dir="auto"
                />
              </div>
            </div>
    
            <br />
            <button type="button" className="bp3-button .bp3-intent-success">reset password</button>
    
            </div>
          </div>
            </div>
        );
    }
}

export default ResetPassword;