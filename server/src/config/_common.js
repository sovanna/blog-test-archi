import {
  ENV_APP as _ENV,
} from '../env';

const _pkg = require('../../package.json');

const _common = {
  dev: true,
  preprod: false,
  prod: false,
  name: _pkg.name,
  version: _pkg.version,
  namespace: _pkg.name.toLowerCase().trim(),
  host: _ENV.SERVER_HOST,
  port: _ENV.SERVER_PORT,
  public: _ENV.CDN_STATIC,
  ttl: parseInt(_ENV.TTL, 10),
  limitSize: '4mb',
  urlencoded: function () {
    const _self = this;
    return {
      extended: true,
      limit: _self.limitSize,
    };
  },
  bodyParser: function () {
    const _self = this;
    return {
      limit: _self.limitSize,
    };
  },
  multer: function () {
    const _self = this;
    return {
      dest: `${_self.public}/uploads`,
    };
  },
  session: {
    secret: _ENV.SERVER_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    unset: 'destroy',
    cookie: {},
  },
  static: {
    maxAge: 1000 * 60 * 60 * 24 * 365,
  },
  /* eslint-disable max-len */
  morgan: ':remote-addr - :remote-user | :date[web] | :method :status | :url | :res[content-length] - :response-time ms',
  /* eslint-enable */
};


export default _common;
