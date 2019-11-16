import React from 'react';
import PropTypes from 'prop-types';
import { Col, Card } from 'antd';
import { withRouter } from 'react-router-dom';

import css from './CourseCard.module.css';

const { Meta } = Card;

class CourseCard extends React.Component {
  handleClick = () => {
    const { course, history } = this.props;

    history.push(`/cursos/${course.id}`);
  };

  render() {
    const { course } = this.props;

    return (
      <Col xs={24} sm={12} md={8} lg={6}>
        <Card
          hoverable
          onClick={this.handleClick}
          className={css.card}
          cover={<img alt="Thumbnail do curso" src={course.thumbnail} />}
        >
          <Meta title={course.title} description={course.description} />
        </Card>
      </Col>
    );
  }
}

export default withRouter(CourseCard);

CourseCard.propTypes = {
  course: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};
