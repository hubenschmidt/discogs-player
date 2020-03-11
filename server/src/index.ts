import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import path from 'path';
import morgan from 'morgan';
import session from 'express-session';
import cors from 'cors';
import fs from 'fs';
import * as passport from 'passport';
import https from 'https';
import http from 'http';
import socketio from 'socket.io';
import { SequelizeStore } from 'connect-session-sequelize';
import { AppRouter } from './AppRouter';
import database from '../src/config/database';
import { Instance, Release, Session, User } from './models';

// initialize Sequelize with session store:
const sequelizeStore = new SequelizeStore(session.Store);

// const passport =

//dotenv config
dotenv.config();

const app = express();
let server: any;

const PORT = process.env.PORT || 5000;

// import routes from './routes';
import { Sequelize } from 'sequelize/types';

//middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(AppRouter.getInstance());

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
};

app.use(cors(corsOptions));

// If we are in production we are already running in https
if (process.env.NODE_ENV === 'production') {
  server = http.createServer(app);
}
// We are not in production so load up our certificates to be able to
// run the server in https mode locally
else {
  const certOptions = {
    key: fs.readFileSync(path.resolve('certs/key.pem')),
    // key: fs.readFileSync(path.resolve('certs/server.key')),
    cert: fs.readFileSync(path.resolve('certs/certificate.pem'))
    // cert: fs.readFileSync(path.resolve('certs/server.crt'))
  };
  // console.log('certOptions', certOptions)
  server = https.createServer(certOptions, app);
}

//sessions
const myStore = new SequelizeStore({
  db: Session.sequelize,
  table: 'Session',
  extendDefaultFields: extendDefaultFields,
  checkExpirationInterval: 15 * 60 * 1000, //the interval at which to cleanup expired sessions in milliseconds.
  expiration: 24 * 60 * 60 * 1000 //the maximum wage (in milliseconds) of a valid session.
});
app.use(
  session({
    secret: <string>process.env.COOKIE_SECRET,
    store: myStore,
    resave: false,
    proxy: true,
    saveUninitialized: false
  })
);
function extendDefaultFields(defaults: any, session: any) {
  return {
    data: defaults.data,
    expires: defaults.expires,
    id: session.UserId
  };
}
//passport
app.use(passport.initialize());
app.use(passport.session()); // calls the deserializer
// //set up routes
// app.use(routes);
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

const io = socketio(server);
app.set('io', io);
// Catch a start up request so that a sleepy Heroku instance can
// be responsive as soon as possible
app.get('/wake-up', (req, res) => res.send(':+1:'));
database.sync().then(function() {
  server.listen(PORT, function() {
    console.log(`:earth_americas: ==> API server now on port ${PORT}!`);
  });
});
