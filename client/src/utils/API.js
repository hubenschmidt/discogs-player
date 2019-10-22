import axios from "axios";

export default {
  //Gets the current user logged in
  registerUser: function(userData) {
    return axios.post("/api/user/", userData);
  },

  loginUser: function(userData) {
    console.log(userData, "API loginUser method");
    return axios.post("api/user/login", userData);
  },
  //Gets the current user logged in
  getUser: function(){
      return axios.get("api/user")
  }
};
