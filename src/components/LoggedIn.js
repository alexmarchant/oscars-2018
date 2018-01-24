import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router'
import Ballot from './Ballot'
import { requestLogOut } from '../actions/auth'

class LoggedIn extends Component {
  logOut = () => {
    this.props.dispatch(requestLogOut())
  }

  render() {
    return (
      <div>
        <header>
          <h1>Oscar Pool 2018</h1>
          <button onClick={this.logOut}>Log Out</button>
        </header>
        <Route exact path="/" component={Ballot} />
      </div>
    )
  }
}

LoggedIn.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

export default LoggedIn
