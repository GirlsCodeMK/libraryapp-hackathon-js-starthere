import http from 'http';
// Middleware for CORS, see below.
import cors from 'cors';
// Logging tool, see below.
import morgan from 'morgan';
// Express is our main web framework.
import express from 'express';
// body-parser lets us send a JSON request body when using our API.
import bodyParser from 'body-parser';

import {sequelize} from './models';
import routes from './routes';

// Set up app
let app = express();
app.server = http.createServer(app);

// Show messages on the terminal
app.use(morgan('dev'));

// Allow requests from any other website (Cross-Origin Resource Sharing)
// More info: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
app.use(cors());

// Support requests with a JSON request body.
app.use(bodyParser.json());

// Load in our routes
app.use('/', routes);

// Work out what port to listen on. Use an environment variable, or the 
// default port of 3000.
const port = process.env.PORT || 3000;

// Check we can connect to the database OK...
sequelize.authenticate().then(() => {
  console.log('[DB] Connected');

  // ...then start the web server
  app.server.listen(port, () => {
    console.log(`[WEB] Server started on port ${port}`);
  });

}).catch((e) => {
  console.warn('[DB] Failed to connect');
  console.warn(e.toString());

  // Quit with a non-zero exit code so nodemon knows we crashed.
  process.exit(1);
});

export default app;
