import React from 'react'
import axios from 'axios'
import { Row } from 'antd'

import CourseCard from '../CourseCard/CourseCard'
import css from './Courses.module.css'

class Courses extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      courses: []
    }
  }

  componentDidMount() {
    const self = this
    const payload = {
      headers: { 'Authorization': localStorage.getItem('token') }
    }

    axios.get('http://localhost:4000/courses', payload)
      .then(response => {
        self.setState({
          courses: response.data
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    const { courses } = this.state
    return (
      <div className={css.results}>
        <Row type="flex" gutter={38}>
          {courses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </Row>
      </div>
    )
  }
}

export default Courses