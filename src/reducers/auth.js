import { AuthActions } from '../actions/auth'

const AuthState = {
  LOADING: 'LOADING',
  LOGGED_IN: 'LOGGED_IN',
  LOGGED_OUT: 'LOGGED_OUT',
}
export { AuthState }

const defaultState = {
  currentUser: null,
  state: AuthState.LOADING,
}

const auth = (state = defaultState, action) => {
  switch (action.type) {
    case AuthActions.DID_LOG_IN:
      return {
        ...state,
        currentUser: action.user,
        state: AuthState.LOGGED_IN,
      }
    case AuthActions.DID_LOG_OUT:
      return {
        ...state,
        currentUser: null,
        state: AuthState.LOGGED_OUT,
      }
    case AuthActions.REQUEST_LOG_OUT:
      return state
    default:
      return state
  }
}

export default auth
