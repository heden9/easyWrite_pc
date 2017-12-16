import React from 'react';
import { connect } from 'dva';
import { Input, Form, Icon, Button } from 'antd';
import './style.less';
const FormItem = Form.Item;

class Modify extends React.PureComponent{
  constructor(...arg){
    super(...arg);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.dispatch({ type: 'user/Modify', payload: values });
      }
    });
  };
  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    return (
      <div className="form-modify">
        <Form onSubmit={this.handleSubmit} className="modify-container">
          <FormItem>
            {getFieldDecorator('oldPassword', {
              rules: [{ required: true, message: '请输入原密码!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入原密码!" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('newPassword', {
              rules: [{ required: true, message: '请输入新密码!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入新密码!" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('rePassword', {
              rules: [{ required: true, pattern: getFieldValue('newPassword'),message: '请确认新密码!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请确认新密码!" />
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className="login-form-button">
              确 认 修 改
            </Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

export default connect()(Form.create()(Modify));
