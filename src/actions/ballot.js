import { makeBallotRef } from '../lib/firebase'
import store from '../lib/store'

export const START_LISTENING_FOR_BALLOT_UPDATES = 'START_LISTENING_FOR_BALLOT_UPDATES'
export function startListeningForBallotUpdates() {
  return (dispatch) => {
    dispatch({
      type: START_LISTENING_FOR_BALLOT_UPDATES,
    })
    const user = store.getState().auth.currentUser
    makeBallotRef(user).on('value', (snapshot) => {
      dispatch(receivedBallotUpdate(snapshot.val()))
    })
  }
}

export const STOP_LISTENING_FOR_BALLOT_UPDATES = 'STOP_LISTENING_FOR_BALLOT_UPDATES'
export function stopListeningForBallotUpdates() {
  return (dispatch) => {
    dispatch({
      type: STOP_LISTENING_FOR_BALLOT_UPDATES,
    })
    const user = store.getState().auth.currentUser
    makeBallotRef(user).off()
  }
}

export const RECEIVED_BALLOT_UPDATE = 'RECEIVED_BALLOT_UPDATE'
function receivedBallotUpdate(ballot) {
  return {
    type: RECEIVED_BALLOT_UPDATE,
    ballot,
  }
}

export const REQUEST_UPDATE_BALLOT = 'REQUEST_UPDATE_BALLOT'
export function requestUpdateBallot(key, value) {
  return (dispatch) => {
    dispatch({
      type: REQUEST_UPDATE_BALLOT,
    })
    const user = store.getState().auth.currentUser
    makeBallotRef(user).child(key).set(value)
  }
}
