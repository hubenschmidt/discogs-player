import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      redirectTo: null
    };

    this.logout = this.logout.bind(this);
  }

  logout(event) {
    event.preventDefault();
    console.log("logging out");
    axios
      .post("/user/logout")
      .then(response => {
        if (response.status === 200) {
          this.props.updateUser({
            loggedIn: false,
            username: null
          });
          // update the state to redirect to dashboard
          this.setState({
            redirectTo: "/login"
          });
        }
      })
      .catch(error => {
        console.log("Logout error");
      });
  }

  render() {
    const loggedIn = this.props.loggedIn;
    return (
      <Fragment>
        <header className="navbar App-header" id="nav-container">
          {loggedIn ? (
            <section className="navbar-section">
              <Link
                to="#"
                className="btn btn-link text-secondary"
                onClick={this.logout}
              >
                <span className="text-secondary">logout</span>
              </Link>
              <Link to="/dashboard" className="btn btn-link text-secondary">
                <span className="text-secondary">dashboard</span>
              </Link>
            </section>
          ) : (
            <section className="navbar-section">
              <Link to="/login" className="btn btn-link text-secondary">
                <span className="text-secondary">login</span>
              </Link>
              {/* <Link to="/register" className="btn btn-link">
                <span className="text-secondary">register</span>
              </Link> */}
            </section>
          )}
        </header>
      </Fragment>
    );
  }
  //   }
}

export default Navbar;
