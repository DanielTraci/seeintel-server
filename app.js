// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv/config');

// ℹ️ Connects to the database
require('./db');

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require('express');

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most middlewares
require('./config')(app);

//Set up session
const session = require("express-session");
const MongoStore = require("connect-mongo");
app.use(
  session({
    secret: process.env.SESSION_KEY,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI || "mongodb://localhost/seeintel",
      ttl: 24 * 60 * 60,
    }),
  })
); 



const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));



// 👇 Start handling routes here
// Contrary to the views version, all routes are controled from the routes/index.js
const allRoutes = require('./routes');
app.use('/api', allRoutes);

const noteRoutes = require("./routes/note.routes")
app.use("/api", noteRoutes)

const userRoutes = require("./routes/user.routes")
app.use("/api", userRoutes)

app.use((req, res, next) => {
	// If no routes match, send them the React HTML.
	res.sendFile(__dirname + "/public/index.html");
});


// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app);

module.exports = app;
