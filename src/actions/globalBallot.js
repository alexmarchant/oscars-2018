import { globalBallotRef } from '../lib/firebase'

export const START_LISTENING_FOR_GLOBAL_BALLOT_UPDATES = 'START_LISTENING_FOR_GLOBAL_BALLOT_UPDATES'
export function startListeningForGlobalBallotUpdates() {
  return (dispatch) => {
    dispatch({
      type: START_LISTENING_FOR_GLOBAL_BALLOT_UPDATES,
    })
    globalBallotRef.on('value', (snapshot) => {
      dispatch(receivedGlobalBallotUpdate(snapshot.val()))
    })
  }
}

export const STOP_LISTENING_FOR_GLOBAL_BALLOT_UPDATES = 'STOP_LISTENING_FOR_GLOBAL_BALLOT_UPDATES'
export function stopListeningForGlobalBallotUpdates() {
  return (dispatch) => {
    dispatch({
      type: STOP_LISTENING_FOR_GLOBAL_BALLOT_UPDATES,
    })
    globalBallotRef.off()
  }
}

export const RECEIVED_GLOBAL_BALLOT_UPDATE = 'RECEIVED_GLOBAL_BALLOT_UPDATE'
function receivedGlobalBallotUpdate(ballot) {
  return {
    type: RECEIVED_GLOBAL_BALLOT_UPDATE,
    ballot,
  }
}

export const REQUEST_DISABLE_GLOBAL_BALLOT = 'REQUEST_DISABLE_GLOBAL_BALLOT'
export function requestDisableGlobalBallot(disabled) {
  return (dispatch) => {
    dispatch({
      type: REQUEST_DISABLE_GLOBAL_BALLOT,
    })
    globalBallotRef.child('disabled').set(disabled)
  }
}
