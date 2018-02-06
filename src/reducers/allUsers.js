import { RECEIVED_ALL_USERS_UPDATE } from '../actions/allUsers'

const defaultState = {}

const allUsers = (state = defaultState, action) => {
  switch (action.type) {
    case RECEIVED_ALL_USERS_UPDATE:
      return action.allUsers || defaultState
    default:
      return state
  }
}

export default allUsers
