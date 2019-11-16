import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

class SecureRoute extends React.Component {
  render() {
    const token = localStorage.getItem('token');
    const { children } = this.props;

    if (token) {
      return children;
    }

    return <Redirect path="/" />;
  }
}

export default SecureRoute;

SecureRoute.propTypes = {
  children: PropTypes.element.isRequired,
};
