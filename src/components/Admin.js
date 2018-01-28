import React, { Component } from 'react'
import { connect } from 'react-redux'
import ballotData from '../data/ballot'
import {
  startListeningForWinnersUpdates,
  stopListeningForWinnersUpdates,
  requestSetWinner,
} from '../actions/winners'
import './Admin.css'

class Admin extends Component {
  componentDidMount() {
      this.props.dispatch(startListeningForWinnersUpdates())
  }

  componentWillUnmount() {
      this.props.dispatch(stopListeningForWinnersUpdates())
  }

  onNomineeClick = (event, category, nominee) => {
    const winner = event.currentTarget.checked ? nominee : null
    this.props.dispatch(requestSetWinner(category, winner))
  }

  render() {
    return (
      <div className="Admin">
        <h1>Admin</h1>
        {ballotData.categories.map((category) => (
          <div key={category.title}>
            <h2>{category.title}</h2>
            {category.nominees.map((nominee) => (
              <div key={nominee.name}>
                <label>
                  <input
                    type="checkbox"
                    checked={this.props.winners[category.title] === nominee.name}
                    onClick={e => this.onNomineeClick(e, category, nominee)}
                  />
                  {nominee.name}
                  {nominee.name !== nominee.film && (
                    <span className="Admin-nomineeFilm"> - {nominee.film}</span>
                  )}
                </label>
              </div>
            ))}
          </div>
        ))}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    winners: state.winners,
  }
}
export default connect(mapStateToProps)(Admin)
