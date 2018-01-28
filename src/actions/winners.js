import { winnersRef } from '../lib/firebase'

export const START_LISTENING_FOR_WINNERS_UPDATES = 'START_LISTENING_FOR_WINNERS_UPDATES'
export function startListeningForWinnersUpdates() {
  return (dispatch) => {
    dispatch(() => ({
      type: START_LISTENING_FOR_WINNERS_UPDATES,
    }))
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

export const REQUEST_SET_WINNER = 'REQUEST_SET_WINNER'
export function requestSetWinner(category, winner) {
  const value = winner ? winner.name : null
  winnersRef.update({ [category.title]: value })
  return {
    type: REQUEST_SET_WINNER,
  }
}
