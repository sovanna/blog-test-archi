const _env_app = () => {
  const _pe = process.env;
  const __env = {};
  const _prefix_name = 'SASRIO_PREFIX';
  const _prefix_reg = new RegExp(`${_pe[_prefix_name]}_`, 'g');

  Object.keys(_pe).reduce((prev, next) => {
    if (next !== _prefix_name && next.indexOf(_pe[_prefix_name]) !== -1) {
      __env[next.replace(_prefix_reg, '')] = _pe[next];
    }

    return __env;
  }, __env);

  return __env;
};

const _env = _env_app();

module.exports = {
  env_app: _env,
  backend_host: _env.SERVER_HOST,
  backend_port: _env.SERVER_PORT,
};
