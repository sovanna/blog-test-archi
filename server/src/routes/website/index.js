import httpProxy from 'http-proxy';


const _client_render_dev = (req, res) => {
  const _proxy = httpProxy.createProxyServer({});

  return _proxy.web(req, res, {
    target: `http://client:${req.__client_port}`,
  });
};


const _conf_router = (_app, _env_node, _env_app) => {
  // routing for blog part
  _app.all('/blog/*', (req, res, next) => {
    req.__client_host = _env_app.CLIENT_HOST;
    req.__client_port = _env_app.CLIENT_PORT;

    res.cookie(`${_env_app.XSRF_TOKEN_NAME}`, req.csrfToken());

    return next();
  }, _client_render_dev);

  _app.use('/blog', (req, res) => {
    return res.redirect('/blog/');
  });


  // TODO handle _client_render_prod

  // other routing
};


export default _conf_router;
