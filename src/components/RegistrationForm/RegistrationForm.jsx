import React from 'react'
import { Form, Input, Select, InputNumber, Button } from 'antd'

class BaseForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      emailConfirmDirty: false,
      passwordConfirmDirty: false
    }
  }

  handleConfirmEmailBlur = e => {
    const { value } = e.target
    this.setState({
      emailConfirmDirty: this.state.emailConfirmDirty || !!value
    })
  }

  validateToNextEmail = (_, value, callback) => {
    const { form } = this.props
    if (value && this.state.emailConfirmDirty) {
      form.validateFields(['confirmEmail'], { force: true })
    }
    callback()
  }

  compareToFirstEmail = (_, value, callback) => {
    const { form } = this.props
    if (value && value !== form.getFieldValue('email')) {
      callback('Os emails estão diferentes')
    } else {
      callback()
    }
  }

  handleConfirmPasswordBlur = e => {
    const { value } = e.target
    this.setState({
      passwordConfirmDirty: this.state.passwordConfirmDirty || !!value
    })
  }

  validateToNextPassword = (_, value, callback) => {
    const { form } = this.props
    if (value && this.state.passwordConfirmDirty) {
      form.validateFields(['confirmPassword'], { force: true })
    }
    callback()
  }

  compareToFirstPassword = (_, value, callback) => {
    const { form } = this.props
    if (value && value !== form.getFieldValue('password')) {
      callback('As senhas estão diferentes')
    } else {
      callback()
    }
  }

  render() {
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

    const { Option } = Select
    const { getFieldDecorator } = this.props.form

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

        {/* Email */}
        <Form.Item label="Email">
          {
            getFieldDecorator('email', {
              rules: [
                {
                  required: true,
                  message: 'Campo obrigatório'
                },
                {
                  type: 'email',
                  message: 'Ensira um email válido'
                },
                {
                  validator: this.validateToNextEmail,
                }
              ]
            })(<Input />)
          }
        </Form.Item>
        <Form.Item label="Confirmar email">
          {
            getFieldDecorator('confirmEmail', {
              rules: [
                {
                  required: true,
                  message: 'Campo obrigatório'
                },
                {
                  validator: this.compareToFirstEmail,
                }
              ]
            })(<Input onBlur={this.handleConfirmEmailBlur} />)
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
            getFieldDecorator('confirmPassword', {
              rules: [
                {
                  required: true,
                  message: 'Campo obrigatório'
                },
                {
                  validator: this.compareToFirstPassword,
                }
              ]
            })(
              <Input.Password onBlur={this.handleConfirmPasswordBlur} />
            )
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
          <InputNumber style={{ width: '100%' }}
            onChange={this.handleNumberChange}
          />
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
