const _conf_router = (_app, _env_node, _env_app) => {
  // routing for api
  _app.use('/api/v1', require('./v1'));
};


export default _conf_router;
