import { RECEIVED_BALLOT_UPDATE } from '../actions/ballot'

const defaultState = {}

const ballot = (state = defaultState, action) => {
  switch (action.type) {
    case RECEIVED_BALLOT_UPDATE:
      return action.ballot || defaultState
    default:
      return state
  }
}

export default ballot
