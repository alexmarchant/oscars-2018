import { RECEIVED_CHAT_UPDATE } from '../actions/chat'

const defaultState = {}

const chat = (state = defaultState, action) => {
  switch (action.type) {
    case RECEIVED_CHAT_UPDATE:
      return action.chat || defaultState
    default:
      return state
  }
}

export default chat
