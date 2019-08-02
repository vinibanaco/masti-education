import React from 'react'

class Dashboard extends React.Component {

  /* ======== FUNCTIONS ======== */

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
    const user = this.props.location.state

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