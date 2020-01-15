import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

function SecureRoute({ children }) {
  const token = localStorage.getItem('token');

  if (token) {
    return <>{children}</>;
  }

  return <Redirect to="/" />;
}

export default SecureRoute;

SecureRoute.propTypes = {
  children: PropTypes.element.isRequired,
};
