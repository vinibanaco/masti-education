import React from 'react'
import axios from 'axios'

class Dashboard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user: {}
    }
  }

  /* ======== FUNCTIONS ======== */

  getUser = () => {
    const payload = {
      headers: { 'authorization': localStorage.getItem('token') }
    }

    axios.get('http://localhost:4000/users/profile', payload)
      .then(response => {
        this.setState({ user: response.data })
      })
      .catch(err => {
        console.log(err)
      })
  }

  renderGender = gender => {
    if (gender)
      return <p>Gênero: {gender}</p>
    return null
  }

  renderAge = age => {
    if (age)
      return <p>Idade: {age}</p>
    return null
  }

  /* ======== REACT METHODS ======== */

  render() {
    const { user } = this.state
    this.getUser()

    return (
      <div>
        <p>Nome: {user.name}</p>
        <p>Email: {user.email}</p>
        {this.renderGender(user.gender)}
        {this.renderAge(user.age)}
      </div>
    )
  }
}

export default Dashboard