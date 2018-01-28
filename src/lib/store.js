import {
  createStore,
  combineReducers,
  applyMiddleware
} from 'redux'
import {
  routerReducer,
  routerMiddleware,
} from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducers from '../reducers'

// Create a history of your choosing (we're using a browser history in this case)
export const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer,
  }),
  composeWithDevTools(
    applyMiddleware(middleware, thunkMiddleware)
  )
)
export default store
