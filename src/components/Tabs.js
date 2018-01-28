import React, { Component } from 'react'
import { Route, Redirect, Switch } from 'react-router'
import cx from 'classnames'
import Ballot from './Ballot'
import Rankings from './Rankings'
import Chat from './Chat'
import Link from './Link'
import './Tabs.css'

class Tabs extends Component {
  render() {
    const Tab = ({ path, children, }) => (
      <Link
        className={cx('Tabs-button', {
          selected: this.props.location.pathname === path,
        })}
        path={path}
      >
        {children}
      </Link>
    )

    return (
      <div className="Tabs">
        <div className="Tabs-buttons">
          <Tab path="/ballot">Ballot</Tab>
          <Tab path="/rankings">Rankings</Tab>
          <Tab path="/chat">Chat</Tab>
        </div>
        <div className="Tabs-body">
          <Switch>
            <Route path="/ballot" component={Ballot} />
            <Route path="/rankings" component={Rankings} />
            <Route path="/chat" component={Chat} />
            <Route exact path="/">
              <Redirect to="/ballot" />
            </Route>
          </Switch>
        </div>
      </div>
    )
  }
}

export default Tabs
