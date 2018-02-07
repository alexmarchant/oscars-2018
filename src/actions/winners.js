import { winnersRef } from '../lib/firebase'

export const START_LISTENING_FOR_WINNERS_UPDATES = 'START_LISTENING_FOR_WINNERS_UPDATES'
export function startListeningForWinnersUpdates() {
  return (dispatch) => {
    dispatch({
      type: START_LISTENING_FOR_WINNERS_UPDATES,
    })
    winnersRef.on('value', (snapshot) => {
      dispatch(receivedWinnersUpdate(snapshot.val()))
    })
  }
}

export const STOP_LISTENING_FOR_WINNERS_UPDATES = 'STOP_LISTENING_FOR_WINNERS_UPDATES'
export function stopListeningForWinnersUpdates() {
  winnersRef.off()
  return {
    type: STOP_LISTENING_FOR_WINNERS_UPDATES,
  }
}

export const RECEIVED_WINNERS_UPDATE = 'RECEIVED_WINNERS_UPDATE'
function receivedWinnersUpdate(winners) {
  return {
    type: RECEIVED_WINNERS_UPDATE,
    winners,
  }
}

export const REQUEST_UPDATE_WINNERS_CATEGORY = 'REQUEST_UPDATE_WINNERS_CATEGORY'
export function requestUpdateWinnersCategory(category, nominee) {
  return (dispatch) => {
    dispatch({
      type: REQUEST_UPDATE_WINNERS_CATEGORY,
    })
    const value = nominee ? nominee.name : null
    winnersRef.child(category.title).set(value)
  }
}
