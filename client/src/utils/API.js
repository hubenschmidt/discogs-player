import axios from "axios";

export default {
  //Gets the current user logged in
  registerUser: function(userData) {
    return axios.post("/api/user/", userData);
  },

  loginUser: function(userData) {
    return axios.post("/api/user/login", userData);
  },

  logoutUser: function(){
    return axios.post("/api/user/logout")
  },
  //Gets the current user logged in
  getUser: function(){
      return axios.get("/api/user")
  }
};
