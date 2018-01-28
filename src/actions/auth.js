import { auth } from '../lib/firebase'

export const START_LISTENING_FOR_AUTH_UPDATE = 'START_LISTENING_FOR_AUTH_UPDATE'
export function startListeningForAuthUpdate() {
  return (dispatch) => {
    dispatch(() => ({
      type: START_LISTENING_FOR_AUTH_UPDATE,
    }))
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
  return {
    type: RECEIVED_LOG_IN,
    user: user,
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
  auth.signOut()
  return {
    type: REQUEST_LOG_OUT,
  }
}
