import conf_dev from './_dev';
import conf_preprod from './_preprod';
import conf_prod from './_prod';
import {
  ENV_NODE as _NODE,
  NODE_DEV,
  NODE_PREPROD,
  NODE_PROD,
} from '../env';


const _config = (_node_env) => {
  switch (_node_env) {
    case NODE_DEV:
      return conf_dev;

    case NODE_PREPROD:
      return conf_preprod;

    case NODE_PROD:
      return conf_prod;

    default:
      return conf_dev;
  }
};


export default _config(_NODE);
