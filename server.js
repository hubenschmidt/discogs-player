const config = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser")
const path = require("path");
const recordRoutes = require('./routes/RecordRoutes');
const db = require("./models");

const morgan = require("morgan");
const session = require("express-session");
const cors = require("cors");

// import config from 'dotenv';
// import express from 'express';
// import bodyParser from 'body-parser';
// import recordRoutes from './routes/RecordRoutes';

const SequelizeStore = require("connect-session-sequelize")(session.Store);

//requiring passport as configured
const passport = require("./config/passport")

config.config();

//express app
const app = express();

//middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

//set up routes
app.use('/api/v1/records', recordRoutes);


// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// when a random route is inputed
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to this API.',
}));

//sessions
const myStore = new SequelizeStore({
  db: db.sequelize,
  table: "Session",
  extendDefaultFields: extendDefaultFields,
  checkExpirationInterval: 15 * 60 * 1000, //the interval at which to cleanup expired sessions in milliseconds.
  expiration: 24 * 60 * 60 * 1000 //the maximum wage (in milliseconds) of a valid session.
})
app.use(session({
  secret: process.env.COOKIE_SECRET,
  store: myStore,
  resave: false,
  proxy: true
}))

function extendDefaultFields(defaults, session){
  return {
    data: defaults.data,
    expires: defaults.expires,
    id: session.UserId
  };
}

//passport
app.use(passport.initialize())
app.use(passport.session()) // calls the deserializer

// Send every request to the React app
// Define any API routes before this runs
// app.get("*", function(req, res) {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

db.sequelize.sync().then(function(){
  app.listen(PORT, function() {
    console.log(`🌎 ==> API server now on port ${PORT}!`);
  });
})

// export default app;

module.exports = app;
