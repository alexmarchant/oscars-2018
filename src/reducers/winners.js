import { RECEIVED_WINNERS_UPDATE } from '../actions/winners'

const defaultState = {}

const winners = (state = defaultState, action) => {
  switch (action.type) {
    case RECEIVED_WINNERS_UPDATE:
      return action.winners || defaultState
    default:
      return state
  }
}

export default winners
