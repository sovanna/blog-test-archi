import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import configureStore from './store/configureStore';

import Home from './containers/Home';

const {
  store,
  history,
} = configureStore(false, window.__PRELOADED_STATE__ || {});


const render_app = (store, history) => {
  render((
    <Provider store={store}>
      <BrowserRouter>
        <Route path="/" component={Home} />
      </BrowserRouter>
    </Provider>
  ), document.getElementById('root'));
};


delete window.__PRELOADED_STATE__;
render_app(store, history);
