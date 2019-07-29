import React from 'react'
import { Form, Input, Select, InputNumber, Button } from 'antd'

// onBlur={this.handleConfirmBlur}

class BaseForm extends React.Component {
  render() {
    const Option = Select.Option
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      }
    }
    const buttonFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      }
    }

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        {/* Nome */}
        <Form.Item label="Nome">
          {
            getFieldDecorator('username', {
              rules: [
                {
                  required: true,
                  message: 'Campo obrigatório'
                }
              ]
            })(<Input />)
          }
        </Form.Item>

        {/* E-mail */}
        <Form.Item label="E-mail">
          {
            getFieldDecorator('email', {
              rules: [
                {
                  required: true,
                  message: 'Campo obrigatório'
                },
                {
                  validator: this.validateToNextEmail,
                }
              ]
            })(<Input />)
          }
        </Form.Item>
        <Form.Item label="Confirmar e-mail">
          {
            getFieldDecorator('email', {
              rules: [
                {
                  required: true,
                  message: 'Campo obrigatório'
                },
                {
                  validator: this.compareToFirstEmail,
                }
              ]
            })(<Input />)
          }
        </Form.Item>

        {/* Senha */}
        <Form.Item label="Senha">
          {
            getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: 'Campo obrigatório'
                },
                {
                  validator: this.validateToNextPassword,
                }
              ]
            })(<Input.Password />)
          }
        </Form.Item>
        <Form.Item label="Confirmar senha">
          {
            getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: 'Campo obrigatório'
                },
                {
                  validator: this.compareToFirstPassword,
                }
              ]
            })(<Input.Password />)
          }
        </Form.Item>

        {/* Gênero */}
        <Form.Item label="Gênero">
          {
            getFieldDecorator('gender')(
              <Select onChange={this.handleSelectChange}>
                <Option value="male">Masculino</Option>
                <Option value="female">Feminino</Option>
                <Option value="empty">Prefiro não divulgar</Option>
              </Select>
            )
          }
        </Form.Item>

        {/* Idade */}
        <Form.Item label="Idade">
          <InputNumber onChange={this.handleNumberChange} />
        </Form.Item>

        {/* Cadastrar */}
        <Form.Item {...buttonFormItemLayout}>
          <Button type="primary" htmlType="submit">Cadastrar</Button>
        </Form.Item>
      </Form>
    )
  }
}

const RegistrationForm = Form.create({ name: 'registration' })(BaseForm)
export default RegistrationForm