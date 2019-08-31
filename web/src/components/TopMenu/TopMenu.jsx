import React from 'react'
import { Menu, Dropdown, Icon, Button } from 'antd'

import css from './TopMenu.module.css'

class TopMenu extends React.Component {
  /* ======== FUNCTIONS ======== */

  renderGender = gender => {
    // In the database, 'gender = 0' is the same as undefined
    if (gender && gender !== "0") {
      let strGender = 'masculino'
      if (gender === 2) {
        strGender = 'feminino'
      }

      return (
        <div className={css.dropdownItem}>
          <span rel="noopener noreferrer">
            {strGender}
          </span>
        </div>
      )
    }

    return
  }

  renderAge = age => {
    // In the database, 'age = 0' is the same as undefined
    if (age && age !== 0) {
      return (
        <div className={css.dropdownItem}>
          <span rel="noopener noreferrer">
            {age} anos
          </span>
        </div>
      )
    }

    return
  }

  logout = () => {
    localStorage.removeItem('token')
    window.location.href = '/'
  }

  /* ======== REACT METHODS ======== */

  render() {
    const { user: { name, email, gender, age } = {} } = this.props
    const dropdownUser = (
      <Menu>
        {/* User data */}
        <div className={css.dropdownItem}>
          <span rel="noopener noreferrer">
            {email}
          </span>
        </div>
        {this.renderGender(gender)}
        {this.renderAge(age)}

        {/* Logout button */}
        <div className={css.dropdownItem}>
          <Button
            block
            type="danger"
            shape="round"
            icon="logout"
            onClick={this.logout}
          >logout</Button>
        </div>
      </Menu>
    )

    return (
      <header className={css.menu}>
        <nav>
          <ul className={css.menuItemList}>
            <li>
              <a className={css.menuItem} href="/dashboard">Home</a>
            </li>
          </ul>
          <div className={css.menuUser}>
            <Dropdown overlay={dropdownUser}>
              <span style={{ cursor: 'default' }}>
                Olá, {name} <Icon type="down" />
              </span>
            </Dropdown>
          </div>
        </nav>
      </header>
    )
  }
}

export default TopMenu