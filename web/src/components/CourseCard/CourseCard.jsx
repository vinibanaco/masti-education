import React from 'react'
import { Col, Card } from 'antd'

import css from './CourseCard.module.css'

const { Meta } = Card

class CourseCard extends React.Component {
  handleClick = () => {
    const { course } = this.props

    console.log(course)
  }

  render() {
    const { course } = this.props
    const cardsLayout = { xs: 24, sm: 12, md: 8, lg: 6 }

    return (
      <Col {...cardsLayout}>
        <Card
          hoverable
          onClick={this.handleClick}
          className={css.card}
          cover={
            <img alt="Thumbnail do curso" src={course.thumbnail} />
          }
        >
          <Meta title={course.title} description={course.description} />
        </Card>
      </Col>
    )
  }
}

export default CourseCard