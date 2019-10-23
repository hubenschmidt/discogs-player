import React, { Component, Fragment } from "react";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";

import io from "socket.io-client";
import OAuth from "../components/OAuth"
// import { API_URL } from "../config";
// const socket = io(API_URL);
const providers = ["discogs"];

//styling
const styles = theme => ({
  // root: {
  //   minHeight: "100vh",
  //   backgroundColor: "#F4F4F4",
  // },
  // paper: {
  //   // marginTop: "100px",
  //   paddingLeft: "10px",
  //   paddingRight: "10px",
  //   backgroundColor: "#ECECEC"
  // },
  // panel: {
  //   paddingLeft: "10px",
  //   paddingRight: "10px"
  // },
  // input: {
  //   width: "100%"
  // },
  // reports: {
  //   textAlign: "right",
  //   backgroundColor: "#77DB7E",
  //   padding: "10px"
  // },
  // reportLinks: {
  //   marginRight: "10vw"
  // }
});

class Dashboard extends Component {
  state = {
    user: {}
  };

  componentWillMount() {
    this.isAuthenticated();
  }

  isAuthenticated = () => {
    API.getUser().then(res =>
      this.setState({
        user: res.data.user
      })
    );
  };

  render() {
    if (!this.state.user) {
      return <Redirect to={{ pathname: "/login" }} />;
    } else {
      return (
        <div style={{ height: "75vh" }} className="container valign-wrapper">
          {providers.map(provider => (
            <OAuth provider={provider} key={provider} socket={socket} />
          ))}
          <div className="row">
            <div className="landing-copy col s12 center-align">
              <h4>
                <p className="flow-text grey-text text-darken-1">
                  You are logged into{" "}
                  <span style={{ fontFamily: "monospace" }}>
                    discogs-player
                  </span>{" "}
                  app. Would you like to authorize discogs?
                </p>
              </h4>
            </div>
          </div>
        </div>
      );
    }
  }
}
export default withStyles(styles)(Dashboard);
// export default Dashboard;
// export default ReactDelayRender({ delay: 1 })(Dashboard);
