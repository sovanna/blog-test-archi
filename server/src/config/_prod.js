import _common from './_common';


export default Object.assign({}, _common, {
  prod: true,
  store_root: _common.namespace + ':prod',
});
