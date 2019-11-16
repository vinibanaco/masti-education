import React from 'react';

import SecureRoute from '../SecureRoute/SecureRoute';
import TopMenu from '../TopMenu/TopMenu';
import Courses from '../Courses/Courses';

function Dashboard() {
  return (
    <SecureRoute>
      <TopMenu />
      <main>
        <Courses />
      </main>
    </SecureRoute>
  );
}

export default Dashboard;
