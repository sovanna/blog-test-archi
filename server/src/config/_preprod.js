import _common from './_common';


export default Object.assign({}, _common, {
  preprod: true,
  store_root: _common.namespace + ':preprod',
});
