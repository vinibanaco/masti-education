import React from 'react'
import { Button, Modal } from 'antd'

import css from './HomePage.module.css'
import RegistrationForm from '../RegistrationForm/RegistrationForm'
import { name } from '../../variables.js'

class HomePage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isModalLoginVisible: false,
      isModalRegistrationVisible: false,
    }
  }

  /* ======== LOGIN ======== */

  handleClickLogin = () => {
    this.setState({
      isModalLoginVisible: true
    })
  }

  handleModalLoginClose = () => {
    this.setState({
      isModalLoginVisible: false
    })
  }

  /* ======== REGISTRATION ======== */

  handleClickRegistration = () => {
    this.setState({
      isModalRegistrationVisible: true
    })
  }

  handleModalRegistrationClose = () => {
    this.setState({
      isModalRegistrationVisible: false
    })
  }

  /* ======== REACT METHODS ======== */

  render() {
    return (
      <div className={css.heroContainer}>
        <h1 className={css.heroTitle}>Bem-vindo à {name}</h1>
        <p className={css.heroSubtitle}>O repositório de conhecimentos da Masti Education!</p>

        <div className={css.heroBtnContainer}>
          {/* ======== LOGIN ======== */}
          <Button
            type="primary"
            size="large"
            className={css.heroBtn}
            onClick={this.handleClickLogin}
          >Acessar o repositório</Button>

          <Modal
            title="EM BREVE!!!"
            centered
            footer={null}
            visible={this.state.isModalLoginVisible}
            onCancel={this.handleModalLoginClose}
            bodyStyle={{ fontSize: '16px' }}
            wrapClassName={css.modal}
          >
            <p>
              Essa funcionalidade ainda não está disponível no momento,
              mas nosso grupo de desenvolvedores está fazendo o possível
              para que ela esteja pronta quanto antes.
            </p>
            <p>
              Só não desanime agora! Cheque outros conteúdos no nosso
              site: <a href="https://masti.com.br/">masti.com.br</a>
            </p>
          </Modal>

          {/* ======== REGISTRATION ======== */}
          <Button
            type="primary"
            size="large"
            className={css.heroBtn}
            onClick={this.handleClickRegistration}
          >Criar uma conta</Button>

          <Modal
            title="CADASTRO"
            centered
            footer={null}
            visible={this.state.isModalRegistrationVisible}
            onCancel={this.handleModalRegistrationClose}
            bodyStyle={{ fontSize: '16px' }}
            wrapClassName={css.modal}
          >
            <RegistrationForm />
          </Modal>
        </div>
      </div>
    )
  }
}

export default HomePage