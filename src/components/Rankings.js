import React, { Component } from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import ballotData from '../data/ballot'
import Page from './Page'
import {
  startListeningForAllUsersUpdates,
  stopListeningForAllUsersUpdates,
} from '../actions/allUsers'
import {
  startListeningForWinnersUpdates,
  stopListeningForWinnersUpdates,
} from '../actions/winners'
import './Rankings.css'

class Rankings extends Component {
  constructor(props) {
    super(props)
    this.scoreForUser = this.scoreForUser.bind(this)
  }

  componentDidMount() {
    this.props.dispatch(startListeningForAllUsersUpdates())
    this.props.dispatch(startListeningForWinnersUpdates())
  }

  componentWillUnmount() {
    this.props.dispatch(stopListeningForAllUsersUpdates())
    this.props.dispatch(stopListeningForWinnersUpdates())
  }

  sortedUsers() {
    return Object
      .values(this.props.allUsers)
      .sort((a, b) => (
        this.scoreForUser(b) - this.scoreForUser(a)
      ))
  }

  scoreForUser(user) {
    return Object.keys(this.props.winners)
      .reduce((accumulator, categoryTitle) => {
        if (
          user.ballot &&
          user.ballot[categoryTitle] === this.props.winners[categoryTitle]
        ) {
          ballotData.categories.forEach((eachCategory) => {
            if (eachCategory.title === categoryTitle) {
              accumulator += eachCategory.points
              return
            }
          })
        }
        return accumulator
      }, 0)
  }

  render() {
    return (
      <div className="Rankings">
        <Page>
          <h1>Rankings</h1>
          <table className="Rankings-table">
            <thead>
              <tr>
                <td className="Rankings-rank">Rank</td>
                <td>Name</td>
                <td className="Rankings-score">Score</td>
              </tr>
            </thead>
            <tbody>
              {this.sortedUsers().map((user, index) => (
                <tr
                  className={cx({
                    odd: index % 2 === 0,
                    even: index % 2 !== 0,
                    mine: user.uid === this.props.currentUser.uid,
                  })}
                  key={user.uid}
                >
                  <td className="Rankings-rank">{index + 1}</td>
                  <td>{user.displayName}</td>
                  <td className="Rankings-score">{this.scoreForUser(user)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Page>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    allUsers: state.allUsers,
    currentUser: state.auth.currentUser,
    winners: state.winners,
  }
}
export default connect(mapStateToProps)(Rankings)
