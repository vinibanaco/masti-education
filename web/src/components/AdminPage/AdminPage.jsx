import React from 'react';

import SecureRoute from '../SecureRoute/SecureRoute';
// import CreateCourse from '../CreateCourse/CreateCourse';

function AdminPage() {
  return (
    <SecureRoute>
      <main>
        {/* <CreateCourse /> */}
        <p>Criar curso</p>
      </main>
    </SecureRoute>
  );
}

export default AdminPage;
