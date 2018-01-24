import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route } from 'react-router'
import firebase from '../lib/firebase'
import {
  didLogIn,
  didLogOut,
  requestLogOut,
} from '../actions/auth'
import { AuthState } from '../reducers/auth'
import LoggedOut from './LoggedOut'
import LoggedIn from './LoggedIn'

class App extends Component {
  componentDidMount() {
    // Constantly watch for user login/logout
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.dispatch(didLogIn(user))
      } else {
        this.props.dispatch(didLogOut())
      }
    })
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
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <AuthRoute />
        )}
      </div>
    )
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  authState: PropTypes.string.isRequired,
}

function mapStateToProps(state) {
  return {
    authState: state.auth.state,
  }
}

export default connect(mapStateToProps)(App)
