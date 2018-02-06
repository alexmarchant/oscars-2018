import React, { Component } from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import ballotData from '../data/ballot'
import {
  startListeningForBallotUpdates,
  stopListeningForBallotUpdates,
  requestUpdateBallot,
} from '../actions/ballot'
import {
  startListeningForWinnersUpdates,
  stopListeningForWinnersUpdates,
} from '../actions/winners'
import Page from './Page'
import './Ballot.css'

class Ballot extends Component {
  componentDidMount() {
    this.props.dispatch(
      startListeningForBallotUpdates(this.props.currentUser)
    )
    this.props.dispatch(startListeningForWinnersUpdates())
  }

  componentWillUnmount() {
    this.props.dispatch(
      stopListeningForBallotUpdates(this.props.currentUser)
    )
    this.props.dispatch(stopListeningForWinnersUpdates())
  }

  updateBallot = (event, key, value) => {
    const dispatchValue = event.currentTarget.checked ? value : null
    this.props.dispatch(requestUpdateBallot(key, dispatchValue))
  }

  won = (categoryTitle) => {
    return this.props.winners &&
      this.props.winners[categoryTitle] &&
      this.props.winners[categoryTitle] === this.props.ballot[categoryTitle]
  }

  lost = (categoryTitle) => {
    return this.props.winners &&
      this.props.winners[categoryTitle] &&
      this.props.winners[categoryTitle] !== this.props.ballot[categoryTitle]
  }

  render() {
    const fieldsCompleted = Object.keys(this.props.ballot).length
    const fieldsCount = Object.keys(ballotData.categories).length + 1
    const percentCompleted = Math.round((fieldsCompleted / fieldsCount) * 100)

    return (
      <div className="Ballot">
        <Page>
          <h1>Ballot</h1>
          <hr />
          <h3>Instructions</h3>
          <ul>
            <li>Fill out the form</li>
            <li>Send <a href="https://venmo.com/amarchant" target="_blank">@alexmarchant</a> $5 on venmo</li>
          </ul>
          <h3>Rules</h3>
          <ul>
            <li>All forms need to be completed and payments in before the oscars start (Mar 4 6:30PM EST). I'll lock the form at that point.</li>
            <li>Each category has a certain number of points assigned. Person with the most points wins.</li>
            <li>In case of a tie, the pot will be split evenly.</li>
          </ul>
          <p className="Ballot-warning">Make sure to come back on oscar night a see your score update in real time in the "Rankings" tab. Also this year we have real time chat in the "Chat" tab.</p>
          <hr />
          {ballotData.categories.map((category) => (
            <div
              className={cx('Ballot-category', {
                won: this.won(category.title),
                lost: this.lost(category.title),
              })}
              key={category.title}
            >
              <h2>{category.title} ({category.points}pts)</h2>
              {category.nominees.map((nominee) => (
                <div key={nominee.name}>
                  <label>
                    <input
                      type="checkbox"
                      checked={this.props.ballot[category.title] === nominee.name}
                      onChange={e => this.updateBallot(e, category.title, nominee.name)}
                    />
                    {nominee.name}
                    {nominee.name !== nominee.film && (
                      <span className="Ballot-nomineeFilm"> - {nominee.film}</span>
                    )}
                    {(
                      (this.won(category.title) || this.lost(category.title)) &&
                      this.props.winners[category.title] === nominee.name
                    ) && (
                      <span className="Ballot-winner">
                        &nbsp;&lt;- Winner
                      </span>
                    )}
                  </label>
                </div>
              ))}
            </div>
          ))}
          <h2>Venmo</h2>
          <label>
            <input
              type="checkbox"
              checked={this.props.ballot.venmo || false}
              onChange={e => this.updateBallot(e, 'venmo', true)}
            />
            I sent <a href="https://venmo.com/amarchant" target="_blank">@alexmarchant</a> $5 on venmo (or other means).
          </label>
          <hr />
          <p>
            {percentCompleted === 100 ? (
              <span className="Ballot-success">
                Your ballot is complete!
              </span>
            ) : (
              <span className="Ballot-warning">
                Your ballot is not yet complete!
              </span>
            )}
            &nbsp;--&nbsp;
            <strong>
              {fieldsCompleted}/{fieldsCount} fields completed -- {percentCompleted}%
            </strong>
          </p>
          <p className="Ballot-warning">
            Your ballot info has been saved!&nbsp;
            <span className="Ballot-note">
              We save your ballot info every time you check a box. Seriously. Trust me. Refresh the page... its all still there.
            </span>
          </p>
        </Page>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    ballot: state.ballot,
    currentUser: state.auth.currentUser,
    winners: state.winners,
  }
}
export default connect(mapStateToProps)(Ballot)
