import { RECEIVED_CHAT_MESSAGES_UPDATE } from '../actions/chatMessages'

const defaultState = {}

const chatMessages = (state = defaultState, action) => {
  switch (action.type) {
    case RECEIVED_CHAT_MESSAGES_UPDATE:
      return action.chatMessages || defaultState
    default:
      return state
  }
}

export default chatMessages
