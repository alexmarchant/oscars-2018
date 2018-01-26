import React, { Component } from 'react'
import { connect } from 'react-redux'
import ballotData from '../data/ballot'
import {
  startListeningForWinners,
  stopListeningForWinners,
  setWinner,
} from '../actions/winners'

class Admin extends Component {
  componentDidMount() {
      this.props.dispatch(startListeningForWinners())
  }

  componentWillUnmount() {
      this.props.dispatch(stopListeningForWinners())
  }

  onNomineeClick = (event, category, nominee) => {
    const winner = event.currentTarget.checked ? nominee : null
    this.props.dispatch(setWinner(category, winner))
  }

  render() {
    return (
      <div>
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
                    <span style={styles.film}> - {nominee.film}</span>
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

const styles = {
  film: {
    color: '#777',
  },
}

function mapStateToProps(state) {
  return {
    winners: state.winners,
  }
}
export default connect(mapStateToProps)(Admin)
