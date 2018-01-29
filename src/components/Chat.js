import React, { Component } from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'
import {
  startListeningForChatMessagesUpdates,
  stopListeningForChatMessagesUpdates,
  requestPushChatMessage,
} from '../actions/chatMessages'
import isMobile from '../lib/isMobile'
import ping from '../media/ping.ogg'
import './Chat.css'

class Chat extends Component {
  constructor(props) {
    super(props)

    this.state = {
      inputText: '',
    }

    this.completedFirstLoad = false
    this.ping = new Audio(ping)
    this.onSubmitInputText = this.onSubmitInputText.bind(this)
  }

  componentDidMount() {
    this.props.dispatch(startListeningForChatMessagesUpdates())
  }

  componentWillUnmount() {
    this.props.dispatch(stopListeningForChatMessagesUpdates())
  }

  componentDidUpdate(prevProps, prevState) {
    const newMessages = Object.keys(this.props.chatMessages)
      .filter(key => !prevProps.chatMessages[key])
      .map(key => this.props.chatMessages[key])

    if (newMessages.length > 0) {
      this.newMessagesAdded(newMessages)
    }
  }

  newMessagesAdded(newMessages) {
    // Some things (like playing the ping noise for new messages)
    // shouldn't happen on first load
    if (this.completedFirstLoad) {
      // If any new messages not from myself
      if (
        newMessages.filter(message => (
          message.user.uid !== this.props.currentUser.uid
        )).length > 0 &&
        !isMobile()
      ) {
        this.ping.play()
      }
    }

    // Scrolling while the keyboard is open on ios messes
    // stuff up
    if (!isMobile() || !this.inputFocus) {
      this.scrollToBottom()
    }
    this.completedFirstLoad = true
  }

  scrollToBottom() {
    window.scrollTo(0,document.body.scrollHeight)
  }

  onSubmitInputText(event) {
    event.preventDefault()
    const cleanedInputText = this.state.inputText.trim()
    if (cleanedInputText.length < 1) { return }

    this.props.dispatch(requestPushChatMessage(
      this.props.currentUser,
      cleanedInputText,
    ))
    this.setState({ inputText: '' })
  }

  chatMessagesGroupedByUser() {
    return Object.keys(this.props.chatMessages)
      .reduce((accumulator, key) => {
        const message = this.props.chatMessages[key]
        message.key = key
        const lastGroup = accumulator[accumulator.length - 1]

        if (lastGroup && lastGroup.user.uid === message.user.uid) {
          lastGroup.messages.push(message)
        } else {
          accumulator.push({
            user: message.user,
            messages: [message],
          })
        }
        return accumulator
      }, [])
  }

  render() {
    return (
      <div className="Chat">
        <div
          className="Chat-messageList"
        >
          {this.chatMessagesGroupedByUser().map((group, index) => (
            <div
              className={cx('Chat-group', {
                mine: group.user.uid === this.props.currentUser.uid,
              })}
              key={index}
            >
              <div className="Chat-groupUser">{group.user.displayName}</div>
              <div className="Chat-groupMessages">
                {group.messages.map(message => (
                  <div
                    className="Chat-message"
                    key={message.key}
                  >
                    {message.body}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <form
          className="Chat-inputForm"
          onSubmit={this.onSubmitInputText}
          action="#"
        >
          <input
            className="Chat-input"
            type="text"
            placeholder="Type a message"
            onChange={e => this.setState({inputText: e.target.value})}
            onFocus={() => this.inputFocus = true}
            onBlur={() => this.inputFocus = false}
            value={this.state.inputText}
          />
          <button className="Chat-sendButton">
            Send
          </button>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    chatMessages: state.chatMessages,
    currentUser: state.auth.currentUser,
  }
}
export default connect(mapStateToProps)(Chat)
