import React from 'react'
import { withRouter } from 'react-router-dom'
import { Form, Input, Button } from 'antd'

class BaseForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault()

    // Revalida os campos obrigatórios do formulário
    this.props.form.validateFields((err, values) => {
      if (!err)
        this.props.history.push('/dashboard', values)
    })
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

    const { getFieldDecorator } = this.props.form

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        {/* Email */}
        <Form.Item label="Email">
          {getFieldDecorator('email', {
            rules: [
              {
                required: true,
                message: 'Campo obrigatório',
              }
            ]
          })(<Input />)}
        </Form.Item>

        {/* Password */}
        <Form.Item label="Senha">
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Campo obrigatório'
              }
            ]
          })(<Input.Password />)}
        </Form.Item>

        {/* Login Button */}
        <Form.Item {...buttonFormItemLayout}>
          <Button type="primary" htmlType="submit">Entrar</Button>
        </Form.Item>
      </Form>
    )
  }
}

const LoginForm = Form.create({ name: 'login' })(BaseForm)
export default withRouter(LoginForm)