import { chatMessagesRef } from '../lib/firebase'

export const START_LISTENING_FOR_CHAT_MESSAGES_UPDATES = 'START_LISTENING_FOR_CHAT_MESSAGES_UPDATES'
export function startListeningForChatMessagesUpdates() {
  return (dispatch) => {
    dispatch(() => ({
      type: START_LISTENING_FOR_CHAT_MESSAGES_UPDATES,
    }))
    chatMessagesRef
      .orderByKey()
      .limitToLast(50)
      .on('value', (snapshot) => {
        dispatch(receivedChatMessagesUpdate(snapshot.val()))
      })
  }
}

export const STOP_LISTENING_FOR_CHAT_MESSAGES_UPDATES = 'STOP_LISTENING_FOR_CHAT_MESSAGES_UPDATES'
export function stopListeningForChatMessagesUpdates() {
  chatMessagesRef.off()
  return {
    type: STOP_LISTENING_FOR_CHAT_MESSAGES_UPDATES,
  }
}

export const RECEIVED_CHAT_MESSAGES_UPDATE = 'RECEIVED_CHAT_MESSAGES_UPDATE'
function receivedChatMessagesUpdate(chatMessages) {
  return {
    type: RECEIVED_CHAT_MESSAGES_UPDATE,
    chatMessages,
  }
}

export const REQUEST_PUSH_CHAT_MESSAGE = 'REQUEST_PUSH_CHAT_MESSAGE'
export function requestPushChatMessage(author, body) {
  chatMessagesRef.push().set({
    author: author,
    body: body,
  })
  return {
    type: REQUEST_PUSH_CHAT_MESSAGE,
  }
}
