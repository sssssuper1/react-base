import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@/models/store';
import routers from '@/config/routers';
import App from '@/routes/App';
import '@/styles/index.less';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App>
        <Suspense fallback={<h3>loading...</h3>}>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/home" />} />
            {routers.map(router => (
              <Route
                key={router.key}
                path={router.path}
                component={lazy(router.component)}
                exact
              />
            ))}
          </Switch>
        </Suspense>
      </App>
    </Router>
  </Provider>,
  document.getElementById('root')
);
