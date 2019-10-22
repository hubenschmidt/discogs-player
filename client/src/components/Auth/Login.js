import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { withStyles } from "@material-ui/styles";

//styling
const styles = theme => ({
  // root: {
  //   backgroundColor: "#ECECEC",
  //   minHeight: "50vh",
  //   justifyContent: "center",
  //   marginTop: "20px"
  // },
  // login: {
  //   marginTop: "20px",
  //   marginRight: "40px"
  // },
  // paper: {
  //   padding: "2px",
  //   textAlign: "left",
  //   color: "grey",
  //   backgroundColor: "#6CBF77"
  // }
});

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: null,
      password: null,
      redirectTo: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }


  componentDidMount() {
    if (this.props.loggedIn) {
      this.setState({
        redirectTo: "/dashboard"
      });
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }


  handleSubmit(event) {
    event.preventDefault();
    axios
      .post("/user/login", {
        username: this.state.username,
        password: this.state.password
      })
      .then(response => {
        console.log("login response: ");
        console.log(response, "login res");
        if (response.status == 200) {
          // update App.js state
          this.props.updateUser({
            loggedIn: true,
            username: response.data.username
          });
        }
      })
      .catch(error => {
        console.log("login error: ");
        console.log(error);
      });
  }

  render() {
    const { classes } = this.props;

    if (this.state.redirectTo) {
      return <Redirect to="/dashboard" />;
    } else {
      return (
        <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Login</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>

            <div className="SignupForm">
              <form className="form-horizontal">
                <div className="form-group">
                  <div className="col-1 col-ml-auto"></div>
                  <div className="input-field col s12">
                    <input
                      className="form-input"
                      type="text"
                      id="email"
                      name="email"
                      value={this.state.email}
                      onChange={this.handleChange}
                    />
                    <label htmlFor="email">Email</label>
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-1 col-ml-auto"></div>
                  <div className="input-field col s12">
                    <input
                      className="form-input"
                      type="password"
                      id="password"
                      name="password"
                      value={this.state.password}
                      onChange={this.handleChange}
                    />
                    <label htmlFor="password">Password</label>
                  </div>
                </div>

                <div className="form-group ">
                  <button
                    className="btn btn-primary col-1 col-mr-auto"
                    onClick={this.handleSubmit}
                    type="submit"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      );
    }
  }
}

export default withStyles(styles)(Login);
