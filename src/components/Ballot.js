import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  startListeningForBallotUpdates,
  stopListeningForBallotUpdates,
  // requestUpdateBallotCategory,
} from '../actions/ballot'

class Ballot extends Component {
  componentDidMount() {
    this.props.dispatch(
      startListeningForBallotUpdates(this.props.currentUser)
    )
  }

  componentWillUnmount() {
    this.props.dispatch(
      stopListeningForBallotUpdates(this.props.currentUser)
    )
  }

  render() {
    // use requestUpdateBallotCategory(category, nominee) to
    // update the firebase db, which will trigger
    // redux and will update the ballot prop to the new value
    return (
      <div>
        <h1>Ballot</h1>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    ballot: state.ballot,
    currentUser: state.auth.currentUser,
  }
}
export default connect(mapStateToProps)(Ballot)
