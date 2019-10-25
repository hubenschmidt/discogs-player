const config = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser")
const path = require("path");
const db = require("./models");
const morgan = require("morgan");
const session = require("express-session");
const cors = require("cors");

const fs = require('fs')
const https = require('https');
const http = require('http');
const socketio = require('socket.io');
const server;


// const passportInit = require('./lib/passport.init');

// initalize sequelize with session store
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const cookieParser = require('cookie-parser')

//requiring passport as configured
const passport = require("./config/passport")

//dotenv config
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

// const corsOptions = {
//   origin: 'http://localhost:3000',
//   credentials: true,

// }
// app.use(cors(corsOptions));


// If we are in production we are already running in https
if (process.env.NODE_ENV === 'production') {
  server = http.createServer(app)
}
// We are not in production so load up our certificates to be able to 
// run the server in https mode locally
else {
  const certOptions = {
    key: fs.readFileSync(path.resolve('certs/key.pem')),
    // key: fs.readFileSync(path.resolve('certs/server.key')),
    cert: fs.readFileSync(path.resolve('certs/certificate.pem'))
    // cert: fs.readFileSync(path.resolve('certs/server.crt'))
  }
  server = https.createServer(certOptions, app)
}


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

// Connecting sockets to the server and adding them to the request 
// so that we can access them later in the controller
const io = socketio(server)
app.set('io', io)

// Catch a start up request so that a sleepy Heroku instance can  
// be responsive as soon as possible
app.get('/wake-up', (req, res) => res.send('👍'))


db.sequelize.sync().then(function(){
  app.listen(PORT, function() {
    console.log(`🌎 ==> API server now on port ${PORT}!`);
  });
})

// export default app;

module.exports = app;
