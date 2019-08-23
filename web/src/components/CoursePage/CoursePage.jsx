import React from 'react'
import axios from 'axios'

import TopMenu from '../TopMenu/TopMenu'

class CoursePage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user: {},
      course: {}
    }
  }

  componentDidMount() {
    const payload = {
      headers: { 'Authorization': localStorage.getItem('token') }
    }
    const { id } = this.props.match.params

    axios.get('http://localhost:4000/users/profile', payload)
      .then(response => {
        this.setState({ user: response.data })
      })
      .catch(err => {
        console.log(err)
      })

    const self = this
    axios.get(`http://localhost:4000/courses/${id}`, payload)
      .then(response => {
        self.setState({
          course: response.data
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    const {
      user,
      course: {
        title, description, instructor, duration, thumbnail, preview_url
      } = {}
    } = this.state

    return (
      <React.Fragment>
        <TopMenu user={user} />
        <main>
          <p>{title}</p>
          <p>{description}</p>
          <p>{instructor}</p>
          <p>{duration}</p>
          <p>{thumbnail}</p>
          <p>{preview_url}</p>
        </main>
      </React.Fragment>
    )
  }
}

export default CoursePage