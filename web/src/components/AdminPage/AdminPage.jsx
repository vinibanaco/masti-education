import React from 'react'

import SecureRoute from '../SecureRoute/SecureRoute'
import TopMenu from '../TopMenu/TopMenu'
import CreateCourse from '../CreateCourse/CreateCourse'

class AdminPage extends React.Component {
  render() {
    return (
      <SecureRoute>
        <TopMenu />
        <main>
          <CreateCourse />
        </main>
      </SecureRoute>
    )
  }
}

export default AdminPage