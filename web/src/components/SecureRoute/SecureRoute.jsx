import React from 'react'
import { Redirect } from 'react-router-dom'

class SecureRoute extends React.Component {
  render() {
    const token = localStorage.getItem('token')

    if (token) {
      return this.props.children
    }

    return <Redirect path="/" />
  }
}

export default SecureRoute