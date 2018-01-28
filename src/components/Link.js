import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

class Link extends Component {
  render() {
    const ownedProps = ['path', 'dispatch']
    const passAlongProps = Object.keys(this.props)
      .reduce((accumulator, key) => {
        if (!ownedProps.includes(key)) {
          accumulator[key] = this.props[key]
        }
        return accumulator
      }, {})
    return (
      <button
        {...passAlongProps}
        onClick={() => {
          this.props.dispatch(push((this.props.path)))
        }} 
      />
    )
  }
}

export default connect()(Link)
