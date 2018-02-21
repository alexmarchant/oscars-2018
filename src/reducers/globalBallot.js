import { RECEIVED_GLOBAL_BALLOT_UPDATE } from '../actions/globalBallot'

const defaultState = {}

const globalBallot = (state = defaultState, action) => {
  switch (action.type) {
    case RECEIVED_GLOBAL_BALLOT_UPDATE:
      return action.ballot || defaultState
    default:
      return state
  }
}

export default globalBallot
