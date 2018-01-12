import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux';

import {
  createLogger,
} from 'redux-logger';

import {
  routerMiddleware,
} from 'react-router-redux';

import thunk from 'redux-thunk';
import createMemoryHistory from 'history/createMemoryHistory';
import createBrowserHistory from 'history/createBrowserHistory';
import rootReducer from '../reducers';


const configureStore = (fromServer, preloadedState) => {
  let history;
  let store;

  if (fromServer) {
    history = createMemoryHistory();
  } else {
    history = createBrowserHistory();
  }

  store = createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(
        thunk,
        createLogger(),
        routerMiddleware(history),
      ),
    ),
  );

  // if (module.hot) {
  //   // Enable Webpack hot module replacement for reducers
  //   module.hot.accept('../reducers', () => {
  //     const nextRootReducer = require('../reducers').default;
  //     store.replaceReducer(nextRootReducer);
  //   });
  // }

  return {
    store,
    history,
  };
};


export default configureStore;
