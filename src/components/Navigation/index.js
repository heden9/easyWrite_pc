import React from 'react';
import { Link } from 'dva/router';
import { Icon } from 'antd';
import './style.less';

export default function Navigation({ hide }) {
  if (hide) {
    return <div/>;
  }
  return (
    <div className="nav-container slideInDown animated">
      <div className="wrapper">
        <div className="btn-group">
          <Link to="/">
            <Icon type="solution" />
            人员管理
          </Link>
          <Link to="/modify">
            <Icon type="unlock" />
            修改密码
          </Link>
          <Link to="/login">
            <Icon type="poweroff" />
            退出系统
          </Link>
        </div>
        <div className="notify-bar">
          <span>今天是</span>
          <span>{new Date().Format('yyyy.MM.dd')}</span>
          <span>{`星期${'日一二三四五六'.charAt(new Date().getDay())}`}</span>
          <span className="message">
            <Icon type="pushpin" style={{ color: 'white' }} />
            <Link to="/home">{'欢迎使用易填表😯~'}</Link>
          </span>
        </div>
      </div>
    </div>
  );
}
