import React from 'react'
import axios from 'axios'
import moment from 'moment'

import SecureRoute from '../SecureRoute/SecureRoute'
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

  /* ===== FUNCTIONS ===== */

  renderClasses = classes => {
    let classData = null

    if (classes) {
      classes.forEach(courseClass => {
        const { title, description, url } = courseClass

        classData =
          <React.Fragment>
            <p>{title}</p>
            <p>{description}</p>
            <a href={url}>{url}</a>
          </React.Fragment>
      })
    }

    return classData
  }

  render() {
    const {
      user,
      course: {
        title, description, instructor, duration, previewUrl, classes
      } = {}
    } = this.state

    const formattedDuration = moment.utc(duration * 1000).format('HH [horas e] mm [minutos]')

    return (
      <SecureRoute>
        {/* Colocar menu no roteador */}
        {/* Criar componente 404 */}
        {/* Estilizar essa página */}
        {/* Adicionar loading ao card */}
        <TopMenu user={user} />
        <main>
          <p>{title}</p>
          <p>{description}</p>
          <p>{instructor}</p>
          <p>{formattedDuration}</p>
          <iframe width="560" height="315"
            src={previewUrl}
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
          {this.renderClasses(classes)}
        </main>
      </SecureRoute>
    )
  }
}

export default CoursePage