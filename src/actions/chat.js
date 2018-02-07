import { chatRef } from '../lib/firebase'

export const START_LISTENING_FOR_CHAT_UPDATES = 'START_LISTENING_FOR_CHAT_UPDATES'
export function startListeningForChatUpdates() {
  return (dispatch) => {
    dispatch({
      type: START_LISTENING_FOR_CHAT_UPDATES,
    })
    chatRef.on('value', (snapshot) => {
      dispatch(receivedChatUpdate(snapshot.val()))
    })
  }
}

export const STOP_LISTENING_FOR_CHAT_UPDATES = 'STOP_LISTENING_FOR_CHAT_UPDATES'
export function stopListeningForChatUpdates() {
  chatRef.off()
  return {
    type: STOP_LISTENING_FOR_CHAT_UPDATES,
  }
}

export const RECEIVED_CHAT_UPDATE = 'RECEIVED_CHAT_UPDATE'
export function receivedChatUpdate(chat) {
  return {
    type: RECEIVED_CHAT_UPDATE,
    chat,
  }
}

export const REQUEST_DISABLE_CHAT = 'REQUEST_DISABLE_CHAT'
export function requestDisableChat(disabled) {
  return (dispatch) => {
    dispatch({
      type: REQUEST_DISABLE_CHAT,
    })
    chatRef.child('disabled').set(disabled)
  }
}
