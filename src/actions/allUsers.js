import { usersRef } from '../lib/firebase'

export const START_LISTENING_FOR_ALL_USERS_UPDATES = 'START_LISTENING_FOR_ALL_USERS_UPDATES'
export function startListeningForAllUsersUpdates() {
  return (dispatch) => {
    dispatch({
      type: START_LISTENING_FOR_ALL_USERS_UPDATES,
    })
    usersRef.on('value', (snapshot) => {
      dispatch(receivedAllUsersUpdate(snapshot.val()))
    })
  }
}

export const STOP_LISTENING_FOR_ALL_USERS_UPDATES = 'STOP_LISTENING_FOR_ALL_USERS_UPDATES'
export function stopListeningForAllUsersUpdates() {
  usersRef.off()
  return {
    type: STOP_LISTENING_FOR_ALL_USERS_UPDATES,
  }
}

export const RECEIVED_ALL_USERS_UPDATE = 'RECEIVED_ALL_USERS_UPDATE'
function receivedAllUsersUpdate(allUsers) {
  return {
    type: RECEIVED_ALL_USERS_UPDATE,
    allUsers,
  }
}
