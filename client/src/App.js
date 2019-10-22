import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Redirect } from "react-router-dom";
import Login from "./components/Auth/Login";
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import Register from "./components/Auth/Register";
import Dashboard from "./pages/Dashboard";
// import Grid from "@material-ui/core/Grid";
// import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      email: null
    };

    this.getUser = this.getUser.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  componentDidMount() {
    this.getUser();
  }

  updateUser(userObject) {
    this.setState(userObject);
  }

  getUser() {
    axios.get("/user/").then(response => {
      console.log("Get user response: ");
      if (response.data.user) {
        console.log("Get User: There is a user saved in the server session: ");

        this.setState({
          loggedIn: true,
          email: response.data.user.email
        });
      } else {
        console.log("Get user: no user");
        this.setState({
          loggedIn: false,
          email: null
        });
      }
    });
  }

  render() {
    const AdminContainer = () => (
      <div>
        <Paper>
        <Navbar updateUser={this.updateUser} loggedIn={this.state.loggedIn} />
        {/* greet user if logged in: */}
        {this.state.loggedIn && <p>You are logged in as, {this.state.email}!</p>}

        {/* show dashboard if logged in: */}
        {this.state.loggedIn && (
          <Route 
          path="/dashboard" 
          component={Dashboard} />
        )}

        {/* redirect to login page if not logged in: */}
        {!this.state.loggedIn && (
          <Route
            path="/dashboard"
            render={() => <Redirect to="/login" />}
          />
        )}

        {/* Routes to different components */}
        <Route
          exact
          path="/login"
          render={() => <Login updateUser={this.updateUser} loggedIn={this.state.loggedIn}/>}
        />
        <Route path="/register" render={() => <Register />} />

      </Paper>
      </div>
    );

    return (
      <div className="App">
        <Router>
          <Switch>
            {/* <Route exact path="/" render={() => <Redirect to="/login" />} /> */}
            <Route exact path="/" component={Landing} />
            <Route exact path="/dashboard" component={AdminContainer} />
            <Route exact path="/login" component={AdminContainer} />
            <Route exact path="/register" component={AdminContainer} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
