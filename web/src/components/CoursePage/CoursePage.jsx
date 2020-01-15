import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import moment from 'moment';

import SecureRoute from '../SecureRoute/SecureRoute';

class CoursePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      course: {},
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const payload = {
      headers: { Authorization: localStorage.getItem('token') },
    };
    const { id } = match.params;

    const self = this;
    axios
      .get(`http://localhost:4000/courses/${id}`, payload)
      .then((response) => {
        self.setState({
          course: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /* ===== FUNCTIONS ===== */

  renderClasses = (classes) => {
    let classesData = null;
    if (classes) {
      classesData = classes.map((courseClass) => {
        const { id, title, description, url } = courseClass;

        return (
          <div key={id}>
            <p>{title}</p>
            <p>{description}</p>
            <a href={url}>{url}</a>
          </div>
        );
      });
    }

    return classesData;
  };

  render() {
    const {
      course: { title, description, instructor, duration, previewUrl, classes } = {},
    } = this.state;

    let hours = '';
    let concat = '';
    let minutes = '';

    const ONE_HOUR = 3600;
    const ONE_MINUTE = 60;

    if (duration >= ONE_HOUR) {
      hours = 'H [hora';
      if (Math.floor(duration / ONE_HOUR) > 1) {
        hours += 's';
      }
      hours += ']';
    }

    if (duration % ONE_HOUR !== 0) {
      if (duration > ONE_HOUR) {
        concat = ' [e] ';
      }

      minutes = 'm [minuto';
      if (duration - Math.floor(duration / ONE_HOUR) * ONE_HOUR !== ONE_MINUTE) {
        minutes += 's';
      }
      minutes += ']';
    }

    const formattedDuration = moment.utc(duration * 1000).format(hours + concat + minutes);

    return (
      <SecureRoute>
        <main>
          <p>{title}</p>
          <p>{description}</p>
          <p>{instructor}</p>
          <p>{formattedDuration}</p>
          <iframe
            width="560"
            height="315"
            title="Vídeo de apresenção do curso"
            src={previewUrl}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          {this.renderClasses(classes)}
        </main>
      </SecureRoute>
    );
  }
}

export default CoursePage;

CoursePage.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};
