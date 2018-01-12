import csrf from 'csurf';

import route_website from './website';
import route_api from './api';


const _configure = (_app, _env_node, _env_app) => {
  if (!_app || !_env_node || !_env_app) {
    return;
  }

  route_api(_app, _env_node, _env_app);

  _app.use(csrf());

  route_website(_app, _env_node, _env_app);
};


export const routes_configurathor = _configure;
