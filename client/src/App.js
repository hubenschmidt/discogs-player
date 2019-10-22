import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Redirect } from "react-router-dom";
import LoginForm from "./components/Auth/Login.js";
import Navbar from "./components/Navbar";
import Signup from "./components/sign-up";
import Dashboard from "./pages/Dashboard";
import Detail from "./pages/Detail";
import Reports from "./pages/Reports";
// import Grid from "@material-ui/core/Grid";
// import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      username: null
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
          username: response.data.user.username
        });
      } else {
        console.log("Get user: no user");
        this.setState({
          loggedIn: false,
          username: null
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
        {/* {this.state.loggedIn && <p>You are logged in as, {this.state.username}!</p>} */}

        {/* show dashboard if logged in: */}
        {this.state.loggedIn && (
          <Route 
          path="/dashboard" 
          component={Dashboard} />
        )}

        {/* show reports if logged in: */}
        {this.state.loggedIn && <Route path="/reports" component={Reports} />}

        {/* redirect to login page if not logged in: */}
        {!this.state.loggedIn && (
          <Route
            path="/customers/:id"
            render={() => <Redirect to="/login" />}
          />
        )}

        {/* Routes to different components */}
        <Route
          exact
          path="/login"
          render={() => <LoginForm updateUser={this.updateUser} loggedIn={this.state.loggedIn}/>}
        />
        <Route path="/register" render={() => <Signup />} />
        <Route exact path="/customers/:id" component={Detail} />
      </Paper>
      </div>
    );

    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/login" />} />
            <Route exact path="/dashboard" component={AdminContainer} />
            <Route exact path="/customers/:id" component={AdminContainer} />
            <Route exact path="/login" component={AdminContainer} />
            <Route exact path="/register" component={AdminContainer} />
            <Route exact path="/reports" component={AdminContainer} />
            {/* <Route exact path="/survey" component={FinancialWellnessSurvey} /> */}
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
