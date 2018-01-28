import React, { Component } from 'react'
import { Route, Switch } from 'react-router'
import { connect } from 'react-redux'
import { requestLogOut } from '../actions/auth'
import Tabs from './Tabs'
import Admin from './Admin'
import './LoggedIn.css'

class LoggedIn extends Component {
  logOut = () => {
    this.props.dispatch(requestLogOut())
  }

  render() {
    return (
      <div className="LoggedIn">
        <div className="LoggedIn-header">
          <div className="LoggedIn-headerTitle">
            Oscar Pool 2018
          </div>
          <div className="LoggedIn-headerCurrentUser">
            {this.props.currentUser.displayName}
            <button onClick={this.logOut}>Log Out</button>
          </div>
        </div>
        <div className="LoggedIn-body">
          <Switch>
            <Route path="/admin" component={Admin} />
            <Route path="/" component={Tabs} />
          </Switch>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.auth.currentUser,
  }
}
export default connect(mapStateToProps)(LoggedIn)
