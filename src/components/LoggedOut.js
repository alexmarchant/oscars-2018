import React, { Component } from 'react'
import { renderFirebaseUI } from '../lib/firebase'
import 'firebaseui/dist/firebaseui.css'
import './LoggedOut.css'

class LoggedOut extends Component {
  componentDidMount() {
    renderFirebaseUI('#firebase-ui-root')
  }

  render() {
    return (
      <div
        id="firebase-ui-root"
        className="LoggedOut"
      />
    )
  }
}

export default LoggedOut
