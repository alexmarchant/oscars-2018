import { winnersRef } from '../lib/firebase'

export const START_LISTENING_FOR_WINNERS = 'START_LISTENING_FOR_WINNERS'
export function startListeningForWinners() {
  return (dispatch) => {
    dispatch(() => ({
      type: START_LISTENING_FOR_WINNERS,
    }))
    winnersRef.on('value', (snapshot) => {
      dispatch(receiveWinners(snapshot.val()))
    })
  }
}

export const STOP_LISTENING_FOR_WINNERS = 'STOP_LISTENING_FOR_WINNERS'
export function stopListeningForWinners() {
  winnersRef.off()
  return {
    type: STOP_LISTENING_FOR_WINNERS,
  }
}

export const RECEIVE_WINNERS = 'RECEIVE_WINNERS'
function receiveWinners(winners) {
  return {
    type: RECEIVE_WINNERS,
    winners,
  }
}

export const SET_WINNER = 'SET_WINNER'
export function setWinner(category, winner) {
  const value = winner ? winner.name : null
  winnersRef.update({ [category.title]: value })
  return {
    type: SET_WINNER,
  }
}
