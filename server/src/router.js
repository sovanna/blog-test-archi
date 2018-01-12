import http from 'http';
import express from 'express';
import swig from 'swig';
import bodyParser from 'body-parser';
import compression from 'compression';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import connectRedis from 'connect-redis';
import favicon from 'serve-favicon';
import path from 'path';

import _conf from './config';

import {
  CACHE,
} from './db';

import {
  ENV_NODE,
  ENV_APP,
  NODE_PROD,
} from './env';

import {
  routes_configurathor,
} from './routes';


/* -- Session configuration ------------------------------------------------- */

const _session_store = new (connectRedis(session))({
  prefix: `${_conf.store_root}:sess:`,
  client: CACHE,
  ttl: _conf.ttl,
});


/* -- Server configuration -------------------------------------------------- */

const _app = express();
const _server = http.Server(_app);

http.globalAgent.maxSockets = Infinity;

if (ENV_NODE === NODE_PROD) {
  _app.set('trust proxy', 1);
  _conf.session.cookie.secure = true;
}

swig.setDefaults({
  cache: _conf.dev ? false : 'memory',
});

_app.engine('html', swig.renderFile);
_app.set('view engine', 'html');
_app.set('view cache', !_conf.dev);
_app.set('views', path.join(`${__dirname}`, 'views'));
_app.use(session(Object.assign({}, _conf.session, { store: _session_store })));
_app.use(bodyParser.urlencoded(_conf.urlencoded()));
_app.use(bodyParser.json(_conf.bodyParser()));
_app.use(cookieParser(_conf.session.secret));
_app.use(compression());
_app.use(morgan(_conf.morgan));
_app.use(favicon(`${_conf.public}/favicon.ico`));
_app.use('/static', express.static(_conf.public, _conf.static));


/* -- Routing --------------------------------------------------------------- */

routes_configurathor(_app, ENV_NODE, ENV_APP);


/* -- Server error ---------------------------------------------------------- */

_app.use((err, req, res, next) => {
  if (err.code !== 'EBADCSRFTOKEN') {
    return next(err);
  }

  return res.sendStatus(err.status);
}, (req, res) => {
  return res.sendStatus(404);
});


/* -- Server starting ------------------------------------------------------- */

_server.listen(_conf.port, _conf.host, () => {
  /* eslint-disable no-console */
  console.log('\n--------------------------------------------------------');
  console.log(`\n[${ENV_NODE}] ${_conf.name} started!`);
  console.log(`[${ENV_NODE}] http://${_conf.host}:${_conf.port}`);
  console.log('\n--------------------------------------------------------');
  /* eslint-enable */
});
