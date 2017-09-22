import React from 'react';
import LoginBack from '../../components/LoginBack';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import './style.less';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
const FormItem = Form.Item;

class Login extends React.PureComponent {
  state = {
    isLogin: false
  };
  componentDidMount(){
    this.props.dispatch({type: 'route/hide', payload: { hideTop: true, hideLeft: true }})
  }
  componentWillUnmount(){
    this.props.dispatch({type: 'route/hide', payload: { hideTop: false, hideLeft: false }})
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.setState({
          isLogin: true
        });
        this.props.dispatch({type: 'user/Login', payload: { ...values }});
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <LoginBack className="login-container">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: '请输入您的账号！' }],
            })(
              <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入您的密码！' }],
            })(
              <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
            )}
          </FormItem>
          <FormItem>
            <Button loading={this.state.isLogin} type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
          </FormItem>
        </Form>
      </LoginBack>
    );
  }
}

const LoginForm = Form.create()(Login);

function mapStateToProps() {
  return {
  }
}


export default connect(mapStateToProps)(LoginForm);
