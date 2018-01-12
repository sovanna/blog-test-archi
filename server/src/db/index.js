import {
  ENV_APP as _ENV,
} from '../env';

import {
  REDIS,
} from './i_redis';


let _instance_cache;


export const CACHE = REDIS(_ENV, _instance_cache);
