import redis from 'ioredis';


const _redis = (_conf, _instance) => {
  if (_instance) {
    return _instance;
  }

  _instance = new redis({
    host: _conf.SERVER_CACHE_HOST,
    port: _conf.SERVER_CACHE_PORT,
    db: 0,
  });

  if (!_instance) {
    throw new Error('Redis instance seems to be null.');
  }

  return _instance;
};


export const REDIS = _redis;
