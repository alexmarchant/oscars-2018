import { auth } from '../lib/firebase'
import { requestUpdateUser } from './users'

export const START_LISTENING_FOR_AUTH_UPDATE = 'START_LISTENING_FOR_AUTH_UPDATE'
export function startListeningForAuthUpdate() {
  return (dispatch) => {
    dispatch({
      type: START_LISTENING_FOR_AUTH_UPDATE,
    })
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(receivedLogIn(user))
      } else {
        dispatch(receivedLogOut())
      }
    })
  }
}

export const RECEIVED_LOG_IN = 'RECEIVED_LOG_IN'
export function receivedLogIn(user) {
  return (dispatch) => {
    dispatch({
      type: RECEIVED_LOG_IN,
      user: user,
    })
    dispatch(requestUpdateUser(user))
  }
}

export const RECEIVED_LOG_OUT = 'RECEIVED_LOG_OUT'
export function receivedLogOut() {
  return {
    type: RECEIVED_LOG_OUT,
  }
}

export const REQUEST_LOG_OUT = 'REQUEST_LOG_OUT'
export function requestLogOut() {
  return (dispatch) => {
    dispatch({
      type: REQUEST_LOG_OUT,
    })
    auth.signOut()
  }
}
