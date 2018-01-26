import { RECEIVE_WINNERS } from '../actions/winners'

const defaultState = {}

const winners = (state = defaultState, action) => {
  switch (action.type) {
    case RECEIVE_WINNERS:
      return action.winners || defaultState
    default:
      return state
  }
}

export default winners
