import http from 'http';
// Middleware for CORS
import cors from 'cors';
// Logging tool
import morgan from 'morgan';
// Express is our main web framework.
import express from 'express';
// body-parser parses the body of web requests (e.g. POST or PUTs)
import bodyParser from 'body-parser';
// cookie-parser automatically parses cookie headers into a usable format
import cookieParser from 'cookie-parser';
// express-session lets us store session data server side, and stores a
// session ID in the cookie.
import session from 'express-session';
// passport is a framework for authentication in NodeJS.
import passport from 'passport';
// passport-local lets us login using local user data (in our DB).
import { Strategy as LocalStrategy } from 'passport-local';
// Encrypt passwords with the Bcrypt algorithm.
import bcrypt from 'bcryptjs';
// Use layouts so we don't have to type the same HTML over and over.
import expressLayouts from 'express-ejs-layouts';
// For flash messages (messages between pages)
import flash from 'express-flash';

import { User, sequelize } from './models';
import routes from './routes';
import currentUser from './lib/currentUser';

// TODO: Set this against Express so we can re-use it.
const env = process.env.NODE_ENV || 'development';

// Set up app
const app = express();
app.server = http.createServer(app);

// Show messages on the terminal
app.use(morgan('dev'));

// Allow requests from any other website (Cross-Origin Resource Sharing)
// More info: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
app.use(cors());

// Parse cookie headers
app.use(cookieParser());

// initalize sequelize with session store
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const mySequelizeStore = new SequelizeStore({
  db: sequelize
});
const { sessionSecret } = require('./config')[env];

app.use(
  session({
    store: mySequelizeStore,
    secret: sessionSecret,
    // Don't resave if session isn't modified; not necessary for the default
    // memory store.
    resave: false,
    // Reduce storage by not saving sessions that aren't even initialized.
    saveUninitialized: false
  })
);
mySequelizeStore.sync();

// support URL-encoded form data. Extended syntax lets us encode objects
// and arrays in URL-encoded format too.
app.use(bodyParser.urlencoded({ extended: true }));

// Support requests with a JSON request body.
app.use(bodyParser.json());

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

// Set up our passport strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email'
    },
    async (email, password, cb) => {
      // Find user by email
      const user = await User.findOne({ where: { email } });

      // Side note for those interested; there's a timing attack here where
      // if we don't find a user, the request is faster than if we do.
      // See: https://sempf.net/post/timing-attacks-in-account-enumeration
      // You could solve this by always doing some kind of bcrypt.compare, whether
      // you find a user or not.
      if (!user) {
        return cb(null, false);
      }

      // Check password is valid.
      // Why bcrypt.compare? https://www.npmjs.com/package/bcrypt#to-check-a-password
      const validPassword = await bcrypt.compare(password, user.getDataValue('encryptedPassword'));
      if (!validPassword) {
        return cb(null, false);
      }

      return cb(null, user);
    }
  )
);

// Configure Passport authenticated session persistence.
passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  const user = await User.findByPk(id);
  cb(null, user);
});

// Configure some middleware to make `req.user` available as `current_user`
// in our views.
app.use(currentUser);

// Set our view engine, which is EJS. This is what we'll write our HTML
// views in. Find out more about EJS: https://ejs.co/
app.set('view engine', 'ejs');
// Keep the views folder within src
app.set('views', 'src/views');
// Load up express-ejs-layouts
app.use(expressLayouts);
// Load up express-flash. See more: https://www.npmjs.com/package/express-flash
app.use(flash());

// Load in our routes
app.use('/', routes);

// Work out what port to listen on. Use an environment variable, or the
// default port of 3000.
const port = process.env.PORT || 3000;

// Check we can connect to the database OK...
sequelize
  .authenticate()
  .then(() => {
    console.log('[DB] Connected');

    // ...then start the web server
    app.server.listen(port, () => {
      console.log(`[WEB] Server started on port ${port} `);
    });
  })
  .catch(e => {
    console.warn('[DB] Failed to connect');
    console.warn(e.toString());

    // Quit with a non-zero exit code so nodemon knows we crashed.
    process.exit(1);
  });

export default app;
