import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router'
import { connect } from 'react-redux'
import { requestLogOut } from '../actions/auth'
import Ballot from './Ballot'
import Admin from './Admin'

class LoggedIn extends Component {
  logOut = () => {
    this.props.dispatch(requestLogOut())
  }

  render() {
    return (
      <div>
        <header style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid black',
        }}>
          <h1>Oscar Pool 2018</h1>
          <div>
            {this.props.currentUser.displayName}
            <button onClick={this.logOut}>Log Out</button>
          </div>
        </header>
        <Route exact path="/" component={Ballot} />
        <Route exact path="/admin" component={Admin} />
      </div>
    )
  }
}

LoggedIn.propTypes = {
  currentUser: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    currentUser: state.auth.currentUser,
  }
}
export default connect(mapStateToProps)(LoggedIn)
