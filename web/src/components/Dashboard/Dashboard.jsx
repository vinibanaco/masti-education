import React from 'react'
import axios from 'axios'

import TopMenu from '../TopMenu/TopMenu'

class Dashboard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user: {}
    }
  }

  /* ======== REACT METHODS ======== */

  componentDidMount() {
    const payload = {
      headers: { 'Authorization': localStorage.getItem('token') }
    }

    axios.get('http://localhost:4000/users/profile', payload)
      .then(response => {
        this.setState({ user: response.data })
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    const { user } = this.state

    return (
      <React.Fragment>
        <TopMenu user={user} />
      </React.Fragment>
    )
  }
}

export default Dashboard