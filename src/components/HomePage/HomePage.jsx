import React from 'react'
import css from './HomePage.module.css'
import { Button, Modal } from 'antd'

class HomePage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isModalVisible: false
    }
  }

  handleClick = () => {
    this.setState({
      isModalVisible: true
    })
  }

  handleModalClose() {
    this.setState({
      isModalVisible: false
    })
  }

  render() {
    return (
      <div className={css.heroContainer}>
        <h1 className={css.heroTitle}>Bem-vindo à NOME</h1>
        <p className={css.heroSubtitle}>O repositório de conhecimentos da Masti Education!</p>

        <Button
          type="primary"
          size="large"
          className={css.heroBtn}
          onClick={this.handleClick}
        >Acessar o repositório</Button>

        <Modal
          title="EM BREVE!!!"
          centered
          footer={null}
          visible={this.state.isModalVisible}
          onCancel={() => this.handleModalClose()}
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
      </div>
    )
  }
}

export default HomePage