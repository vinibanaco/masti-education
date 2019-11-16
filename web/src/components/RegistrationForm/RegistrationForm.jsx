import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Form, Input, Select, InputNumber, Button } from 'antd';

class BaseForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      emailConfirmDirty: false,
      passwordConfirmDirty: false,
    };
  }

  /* ======== VALIDATION ======== */

  validateToNextEmail = (_, value, callback) => {
    const { emailConfirmDirty } = this.state;
    const { form } = this.props;

    if (value && emailConfirmDirty) {
      form.validateFields(['confirmEmail'], { force: true });
    }
    callback();
  };

  compareToFirstEmail = (_, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('email')) {
      callback('Os emails estão diferentes');
    } else {
      callback();
    }
  };

  validateToNextPassword = (_, value, callback) => {
    const { passwordConfirmDirty } = this.state;
    const { form } = this.props;

    if (value && passwordConfirmDirty) {
      form.validateFields(['confirmPassword'], { force: true });
    }

    callback();
  };

  compareToFirstPassword = (_, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('As senhas estão diferentes');
    }
    callback();
  };

  /* ======== VERIFICATION ======== */

  verifyAge = (_, value, callback) => {
    if (value < 0 || value > 120) {
      callback('Ensira uma idade válida');
    }
    callback();
  };

  /* ======== HANDLES ======== */

  // Retira o estilo de erro do campo caso este tenha sido corrigido
  handleConfirmPasswordBlur = (e) => {
    const { passwordConfirmDirty } = this.state;
    const { value } = e.target;

    this.setState({
      passwordConfirmDirty: passwordConfirmDirty || !!value,
    });
  };

  handleConfirmEmailBlur = (e) => {
    const { emailConfirmDirty } = this.state;
    const { value } = e.target;

    this.setState({
      emailConfirmDirty: emailConfirmDirty || !!value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    // Revalida os campos obrigatórios do formulário
    const { form, history } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        axios
          .post('http://localhost:4000/users', values)
          .then((response) => {
            localStorage.setItem('token', response.data.accessToken);

            history.push('/dashboard', values);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  /* ======== REACT METHODS ======== */

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

    const { Option } = Select;
    const {
      form: { getFieldDecorator },
    } = this.props;

    return (
      <Form
        labelCol={formItemLayout.labelCol}
        wrapperCol={formItemLayout.wrapperCol}
        onSubmit={this.handleSubmit}
      >
        {/* Name */}
        <Form.Item label="Nome">
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: 'Campo obrigatório',
              },
              {
                max: 50,
                message: 'Ensira uma senha com no máximo 50 caracteres',
              },
            ],
          })(<Input />)}
        </Form.Item>

        {/* Email */}
        <Form.Item label="Email">
          {getFieldDecorator('email', {
            rules: [
              {
                required: true,
                message: 'Campo obrigatório',
              },
              {
                max: 255,
                message: 'Ensira um email com no máximo 255 caracteres',
              },
              {
                type: 'email',
                message: 'Ensira um email válido',
              },
              {
                validator: this.validateToNextEmail,
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Confirmar email">
          {getFieldDecorator('confirmEmail', {
            rules: [
              {
                required: true,
                message: 'Campo obrigatório',
              },
              {
                validator: this.compareToFirstEmail,
              },
            ],
          })(<Input onBlur={this.handleConfirmEmailBlur} />)}
        </Form.Item>

        {/* Password */}
        <Form.Item label="Senha">
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Campo obrigatório',
              },
              {
                min: 8,
                message: 'Ensira uma senha com pelo menos 8 caracteres',
              },
              {
                max: 50,
                message: 'Ensira uma senha com no máximo 50 caracteres',
              },
              {
                validator: this.validateToNextPassword,
              },
            ],
          })(<Input.Password />)}
        </Form.Item>
        <Form.Item label="Confirmar senha">
          {getFieldDecorator('confirmPassword', {
            rules: [
              {
                required: true,
                message: 'Campo obrigatório',
              },
              {
                validator: this.compareToFirstPassword,
              },
            ],
          })(<Input.Password onBlur={this.handleConfirmPasswordBlur} />)}
        </Form.Item>

        {/* Gender */}
        <Form.Item label="Gênero">
          {getFieldDecorator('gender')(
            <Select onChange={this.handleSelectChange}>
              <Option value="1">Masculino</Option>
              <Option value="2">Feminino</Option>
              <Option value="0">Prefiro não divulgar</Option>
            </Select>,
          )}
        </Form.Item>

        {/* Age */}
        <Form.Item label="Idade">
          {getFieldDecorator('age', {
            rules: [
              {
                type: 'number',
                min: 1,
                max: 119,
                message: 'Ensira uma idade válida',
              },
            ],
          })(<InputNumber style={{ width: '100%' }} onChange={this.handleNumberChange} />)}
        </Form.Item>

        {/* Registration Button */}
        <Form.Item {...buttonFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Cadastrar
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const RegistrationForm = Form.create({ name: 'registration' })(BaseForm);
export default withRouter(RegistrationForm);

BaseForm.propTypes = {
  form: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};
