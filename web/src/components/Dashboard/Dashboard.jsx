import React from 'react';

import SecureRoute from '../SecureRoute/SecureRoute';
import Courses from '../Courses/Courses';

function Dashboard() {
  return (
    <SecureRoute>
      <main>
        <Courses />
      </main>
    </SecureRoute>
  );
}

export default Dashboard;
