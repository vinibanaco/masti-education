import React from 'react'
import css from './HomePage.module.css'
import { Button } from 'antd'

class HomePage extends React.Component {
  render() {
    return (
      <div className={css.heroContainer}>
        <h1 className={css.heroText}>
          Bem-vindo à NOME, o repositório de conhecimentos da Masti
          Education!
        </h1>
        <Button type="primary" size="large" className={css.heroBtn}>Acessar o repositório</Button>
      </div>
    )
  }
}

export default HomePage