import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import API from "../../utils/API";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      email: null,
      password: null,
      password2: null,
      confirmPassword: null,
      redirectTo: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  handleSubmit(event) {
    // console.log('sign-up handleSubmit, username: ')
    // console.log(this.state.username)
    event.preventDefault();

    // //request to server to add a new username/password
    // axios
    //   .post("/api/user/", {
    //     email: this.state.email,
    //     password: this.state.password
    //   }
    API.registerUser({ email: this.state.email, password: this.state.password, password2: this.state.password2 })
      .then(response => {
        if (!response.data.errmsg) {
          // console.log('successful signup')
          this.setState({
            //redirect to login page
            redirectTo: "/login"
          });
        } else {
          console.log("username already taken");
        }
      })
      .catch(error => {
        console.log(error, "signup error: ");
      });
  }

  render() {
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
                <b>Register</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Already have an account? <Link to="/login">Log in </Link>
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

                <div className="form-group">
                  <div className="col-1 col-ml-auto"></div>
                  <div className="input-field col s12">
                    <input
                      className="form-input"
                      type="password"
                      id="password2"
                      name="password2"
                      value={this.state.password2}
                      onChange={this.handleChange}
                    />
                    <label htmlFor="password2">Confirm password</label>
                  </div>
                </div>

                <div className="form-group ">
                  <button
                    className="btn btn-primary col-1 col-mr-auto"
                    onClick={this.handleSubmit}
                    type="submit"
                  >
                    Register
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

export default Register;
