const config = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser")
const path = require("path");
const db = require("./models");
const morgan = require("morgan");
const session = require("express-session");
const cors = require("cors");


// initalize sequelize with session store
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const cookieParser = require('cookie-parser')

//requiring passport as configured
const passport = require("./config/passport")

config.config();

//express app
const app = express();


// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 5000;

//require routes
const routes = require('./routes');

//middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());




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
  proxy: true,
  saveUninitialized: false
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

// //set up routes
app.use(routes);

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Send every request to the React app
// Define any API routes before this runs
// app.get("*", function(req, res) {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

// when a random route is inputed
// app.get('*', (req, res) => res.status(200).send({
//   message: 'Welcome to this API.',
// }));

// app.get('*', (req, res) => res.sendFile(path.resolve('./client/build', 'index.html')));

db.sequelize.sync().then(function(){
  app.listen(PORT, function() {
    console.log(`🌎 ==> API server now on port ${PORT}!`);
  });
})

// export default app;

module.exports = app;
