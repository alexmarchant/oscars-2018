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
  const user = store.getState().auth.currentUser
  makeBallotRef(user).off()
  return {
    type: STOP_LISTENING_FOR_BALLOT_UPDATES,
  }
}

export const RECEIVED_BALLOT_UPDATE = 'RECEIVED_BALLOT_UPDATE'
function receivedBallotUpdate(ballot) {
  return {
    type: RECEIVED_BALLOT_UPDATE,
    ballot,
  }
}

export const REQUEST_UPDATE_BALLOT_CATEGORY = 'REQUEST_UPDATE_BALLOT_CATEGORY'
export function requestUpdateBallotCategory(category, nominee) {
  const user = store.getState().auth.currentUser
  const value = nominee ? nominee.name : null
  makeBallotRef(user).child(category.title).set(value)
  return {
    type: REQUEST_UPDATE_BALLOT_CATEGORY,
  }
}
