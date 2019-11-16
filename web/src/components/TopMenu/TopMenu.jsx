import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Menu, Dropdown, Icon, Button } from 'antd';

import css from './TopMenu.module.css';

class TopMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
    };
  }

  componentDidMount() {
    const payload = {
      headers: { Authorization: localStorage.getItem('token') },
    };

    axios
      .get('http://localhost:4000/users/profile', payload)
      .then((response) => {
        this.setState({ user: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /* ======== FUNCTIONS ======== */

  renderGender = (gender) => {
    // In the database, 'gender = 0' is the same as undefined
    if (gender && gender !== '0') {
      let strGender = 'masculino';
      if (gender === 2) {
        strGender = 'feminino';
      }

      return (
        <div className={css.dropdownItem}>
          <span rel="noopener noreferrer">{strGender}</span>
        </div>
      );
    }

    return null;
  };

  renderAge = (age) => {
    // In the database, 'age = 0' is the same as undefined
    if (age && age !== 0) {
      const ageText = `${age} anos`;

      return (
        <div className={css.dropdownItem}>
          <span rel="noopener noreferrer">{ageText}</span>
        </div>
      );
    }

    return null;
  };

  renderAdminBtn = (roles) => {
    if (roles) {
      let adminBtn = null;
      roles.forEach((role) => {
        if (role === 2) {
          const { history } = this.props;

          adminBtn = (
            <Button
              ghost
              size="small"
              className={css.btnAdmin}
              onClick={() => history.push('/admin')}
            >
              admin
            </Button>
          );
        }
      });
      return adminBtn;
    }

    return null;
  };

  logout = () => {
    const { history } = this.props;
    localStorage.removeItem('token');

    history.push('/');
  };

  /* ======== REACT METHODS ======== */

  render() {
    const { user: { name, email, gender, age, roles } = {} } = this.state;
    const dropdownUser = (
      <Menu>
        {/* User data */}
        <div className={css.dropdownItem}>
          <span rel="noopener noreferrer">{email}</span>
        </div>
        {this.renderGender(gender)}
        {this.renderAge(age)}

        {/* Logout button */}
        <div className={css.dropdownItem}>
          <Button block type="danger" shape="round" icon="logout" onClick={this.logout}>
            logout
          </Button>
        </div>
      </Menu>
    );
    const hello = `Olá, ${name}`;

    return (
      <header className={css.menu}>
        <nav>
          <ul className={css.menuItemList}>
            <li>
              <a className={css.menuItem} href="/dashboard">
                Home
              </a>
            </li>
          </ul>
          <div className={css.menuUser}>
            {this.renderAdminBtn(roles)}
            <Dropdown overlay={dropdownUser}>
              <span style={{ cursor: 'default' }}>
                {hello}
                <Icon type="down" />
              </span>
            </Dropdown>
          </div>
        </nav>
      </header>
    );
  }
}

export default withRouter(TopMenu);

TopMenu.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};
