import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router'
import {
  startListeningForAuthUpdate,
  requestLogOut,
} from '../actions/auth'
import { AuthState } from '../reducers/auth'
import LoggedOut from './LoggedOut'
import LoggedIn from './LoggedIn'
import './App.css'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(startListeningForAuthUpdate())
  }

  logOut = () => {
    this.props.dispatch(requestLogOut())
  }

  render() {
    const loading = this.props.authState === AuthState.LOADING
    const loggedIn = this.props.authState === AuthState.LOGGED_IN

    const AuthRoute = () => {
      if (loggedIn) {
        return <Route path="/" component={LoggedIn} />
      } else {
        return <Route path="/" component={LoggedOut} />
      }
    }

    return (
      <div className="App">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <AuthRoute />
        )}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    authState: state.auth.state,
  }
}
export default connect(mapStateToProps)(App)
