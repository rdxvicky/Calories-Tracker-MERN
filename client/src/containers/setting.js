import React, { Component } from "react";
import {
  Button,
  Card,
  Elevation,
} from "@blueprintjs/core";

class Settings extends Component {
    render() {
        return (
          <div className="container">
            <Card interactive={true} elevation={Elevation.TWO}>
              <h3 align="center">Input Your Calories Here!</h3>
              <div align="center">
                <input
                  class="bp3-input"
                  type="text"
                  placeholder="Your pre defined calories value"
                  dir="auto"
                />
              </div>
              <br />
              <div align="center">
                <Button text="Add" />
              </div>
            </Card>
          </div>
        );
      }
    }

  
export default Settings;
