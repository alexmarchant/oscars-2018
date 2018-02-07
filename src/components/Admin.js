import React, { Component } from 'react'
import { connect } from 'react-redux'
import ballotData from '../data/ballot'
import {
  startListeningForWinnersUpdates,
  stopListeningForWinnersUpdates,
  requestUpdateWinnersCategory,
} from '../actions/winners'
import {
  requestPushChatMessage,
  requestDeleteAllChatMessages,
} from '../actions/chatMessages'
import {
  startListeningForChatUpdates,
  stopListeningForChatUpdates,
  requestDisableChat
} from '../actions/chat'
import Page from './Page'
import './Admin.css'

class Admin extends Component {
  componentDidMount() {
    this.props.dispatch(startListeningForWinnersUpdates())
    this.props.dispatch(startListeningForChatUpdates())
  }

  componentWillUnmount() {
    this.props.dispatch(stopListeningForWinnersUpdates())
    this.props.dispatch(stopListeningForChatUpdates())
  }

  onChangeNominee = (event, category, nominee) => {
    const winner = event.currentTarget.checked ? nominee : null
    this.props.dispatch(requestUpdateWinnersCategory(category, winner))
  }

  sendTestChatMessage = () => {
    this.props.dispatch(requestPushChatMessage({
      uid: '0',
      displayName: 'Test User',
    }, 'Test message'))
  }

  clearAllChatMessages = () => {
    this.props.dispatch(requestDeleteAllChatMessages())
  }

  disableChat = (event) => {
    const disabled = event.currentTarget.checked
    this.props.dispatch(requestDisableChat(disabled))
  }

  render() {
    return (
      <div className="Admin">
        <Page>
          <h1>Admin</h1>
          <hr />
          <p>
            <button onClick={this.sendTestChatMessage}>Send test chat message</button>
          </p>
          <p>
            <button onClick={this.clearAllChatMessages}>Clear all chat messages</button>
          </p>
          <p>
            <label>
              <input
                type="checkbox"
                checked={this.props.chat.disabled}
                onChange={e => this.disableChat(e)}
              />
              Disable chat
            </label>
          </p>
          <hr />
          {ballotData.categories.map((category) => (
            <div key={category.title}>
              <h2>{category.title} ({category.points}pts)</h2>
              {category.nominees.map((nominee) => (
                <div key={nominee.name}>
                  <label>
                    <input
                      type="checkbox"
                      checked={this.props.winners[category.title] === nominee.name}
                      onChange={e => this.onChangeNominee(e, category, nominee)}
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
        </Page>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    winners: state.winners,
    chat: state.chat,
  }
}
export default connect(mapStateToProps)(Admin)
