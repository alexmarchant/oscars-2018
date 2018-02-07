import React, { Component } from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'
import {
  startListeningForChatMessagesUpdates,
  stopListeningForChatMessagesUpdates,
  requestPushChatMessage,
} from '../actions/chatMessages'
import {
  startListeningForChatUpdates,
  stopListeningForChatUpdates,
} from '../actions/chat'
import isMobile from '../lib/isMobile'
import ping from '../media/ping.ogg'
import './Chat.css'

class Chat extends Component {
  constructor(props) {
    super(props)

    this.state = {
      inputText: '',
      inputtingText: false,
    }

    this.completedFirstLoad = false
    this.ping = new Audio(ping)
    this.onSubmitInputText = this.onSubmitInputText.bind(this)
  }

  componentDidMount() {
    this.props.dispatch(startListeningForChatMessagesUpdates())
    this.props.dispatch(startListeningForChatUpdates())
    this.scrollToBottom()
  }

  componentWillUnmount() {
    this.props.dispatch(stopListeningForChatMessagesUpdates())
    this.props.dispatch(stopListeningForChatUpdates())
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
    window.scrollTo(0, document.body.scrollHeight)
  }

  scrollToTop() {
    window.scrollTo(0, 0)
  }

  onSubmitInputText(event) {
    event.preventDefault()
    const cleanedInputText = this.state.inputText.trim()
    if (cleanedInputText.length < 1) { return }

    if (isMobile()) {
      document.activeElement.blur()
    }

    this.props.dispatch(requestPushChatMessage(
      this.props.currentUser,
      cleanedInputText,
    ))
    this.setState({
      inputText: '',
      inputtingText: false,
    })
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
    if (this.props.chat.disabled) {
      return <p>Chat has been disabled</p>
    }

    return (
      <div
        className={cx('Chat', {
          inputtingText: this.state.inputtingText,
          mobile: isMobile(),
        })}
      >
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
          <textarea
            className="Chat-input"
            type="text"
            placeholder="Type a message"
            onChange={e => this.setState({inputText: e.target.value})}
            onFocus={() => {
              this.setState({inputtingText: true})
              // Don't let the keyboard slide up the screen
              if (isMobile()) {
                const interval = setInterval(() => {
                  this.scrollToTop()
                }, 30)
                setTimeout(() => { clearInterval(interval) }, 500)
              }
            }}
            onBlur={e => {
              this.setState({inputtingText: false})
              if (isMobile()) {
                const interval = setInterval(() => {
                  this.scrollToBottom()
                }, 30)
                setTimeout(() => { clearInterval(interval) }, 500)
              }
            }}
            onKeyUp={e => {
              if (e.keyCode === 13) {
                this.onSubmitInputText(e)
              }
            }}
            value={this.state.inputText}
          />
          <input
            type="submit"
            className="Chat-sendButton"
            onTouchStart={this.onSubmitInputText}
            onClick={this.onSubmitInputText}
            value="Send"
          />
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    chatMessages: state.chatMessages,
    currentUser: state.auth.currentUser,
    chat: state.chat,
  }
}
export default connect(mapStateToProps)(Chat)
