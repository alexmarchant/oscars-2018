import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Route } from 'react-router'
import {
  ConnectedRouter,
} from 'react-router-redux'
import App from './components/App'
import { unregister } from './registerServiceWorker'
import store, { history } from './lib/store'
import './index.css'

// Clear service workers
unregister()

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route path="/" component={App} />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
