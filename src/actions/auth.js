import { auth } from '../lib/firebase'

const AuthActions = {
  DID_LOG_IN: 'DID_LOG_IN',
  DID_LOG_OUT: 'DID_LOG_OUT',
  REQUEST_LOG_OUT: 'REQUEST_LOG_OUT',
}
export { AuthActions }

export function didLogIn(user) {
  return {
    type: AuthActions.DID_LOG_IN,
    user: user,
  }
}

export function didLogOut() {
  return {
    type: AuthActions.DID_LOG_OUT,
  }
}

export function requestLogOut() {
  auth.signOut()
  return {
    type: AuthActions.REQUEST_LOG_OUT,
  }
}
