import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { withStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";

//styling
const styles = theme => ({
  root: {
    backgroundColor: "#ECECEC",
    minHeight: "50vh",
    justifyContent: "center",
    marginTop: "20px"
  },
  login: {
    marginTop: "20px",
    marginRight: "40px"
  },
  paper: {
    padding: "2px",
    textAlign: "left",
    color: "grey",
    backgroundColor: "#6CBF77"
  }
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
        <Fragment>
          <CssBaseline />
          <Container>
            <Grid container className={classes.root}>
              <Grid item xs={3} sm={3} className={classes.login}>
                <div className="login-card mls
                t-5">
                  <div className="card-body">
                    <form onSubmit={this.handleSubmit}>
                      <div className="input-group form-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fas fa-user"></i>
                          </span>
                        </div>
                        <input
                          onChange={this.handleChange}
                          value={this.state.username}
                          name="username"
                          type="username"
                          className="form-control"
                          placeholder="username"
                        />
                      </div>
                      <div className="input-group form-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fas fa-key"></i>
                          </span>
                        </div>
                        <input
                          onChange={this.handleChange}
                          value={this.state.password}
                          name="password"
                          type="password"
                          minlength="8"
                          className="form-control"
                          placeholder="password"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="submit"
                          value="Login"
                          className="btn login_btn float-right"
                          style={{
                            borderColor: "#2faa3f",
                            color: "#2faa3f",
                            marginRight: "50px"
                          }}
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Container>
        </Fragment>
      );
    }
  }
}

export default withStyles(styles)(LoginForm);
