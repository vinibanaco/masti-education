import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { Form, Input, Button } from 'antd';

class BaseForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();

    // Revalida os campos obrigatórios do formulário
    const { form } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        const payload = {
          username: values.email,
          password: values.password,
        };

        // Conecta com a API
        const { history } = this.props;
        axios
          .post('http://localhost:4000/users/login', payload)
          .then((response) => {
            localStorage.setItem('token', response.data);

            history.push('/dashboard', values);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
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
      },
    };

    const {
      form: { getFieldDecorator },
    } = this.props;

    return (
      <Form
        labelCol={formItemLayout.labelCol}
        wrapperCol={formItemLayout.wrapperCol}
        onSubmit={this.handleSubmit}
      >
        {/* Email */}
        <Form.Item label="Email">
          {getFieldDecorator('email', {
            rules: [
              {
                required: true,
                message: 'Campo obrigatório',
              },
            ],
          })(<Input />)}
        </Form.Item>

        {/* Password */}
        <Form.Item label="Senha">
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Campo obrigatório',
              },
            ],
          })(<Input.Password />)}
        </Form.Item>

        {/* Login Button */}
        <Form.Item wrapperCol={buttonFormItemLayout.wrapperCol}>
          <Button type="primary" htmlType="submit">
            Entrar
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const LoginForm = Form.create({ name: 'login' })(BaseForm);
export default withRouter(LoginForm);

BaseForm.propTypes = {
  form: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};
