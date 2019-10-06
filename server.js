const config = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser")
const path = require("path");
const recordRoutes = require('./routes/RecordRoutes');

// import config from 'dotenv';
// import express from 'express';
// import bodyParser from 'body-parser';
// import recordRoutes from './routes/RecordRoutes';

config.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3001

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

// Send every request to the React app
// Define any API routes before this runs
// app.get("*", function(req, res) {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

app.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});

// export default app;

module.exports = app;
