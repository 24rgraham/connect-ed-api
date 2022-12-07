const express = require('express');
const session = require('express-session');
const routes = require('./routes');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge:1000*60*60*24*365
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };
 
  app.use(session(sess));
  
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
  app.use(routes);
  
  sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => console.log('Now listening on localhost:3001'));
  });