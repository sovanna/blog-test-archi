import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as notifications } from 'react-notification-system-redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';


const _initial = {};

const _init_ = (state = _initial, action) => {
  return state;
};

const rootReducer = combineReducers({
  _init_,
  notifications,
  loadingBar,
  router: routerReducer,
});


export default rootReducer;
