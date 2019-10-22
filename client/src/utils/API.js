import axios from "axios";

export default {
  //Gets the current user logged in
  registerUser: function(userData) {
    return axios.post("/api/user/", userData);
  }
  //Gets the current user logged in
  // getUser: function(){
  //     return axios.get("api/user")
  // }
};
