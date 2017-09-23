import React, { PropTypes } from 'react';
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
          <Link to="/">
            <Icon type="unlock" />
            修改密码
          </Link>
          <Link to="/">
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
            <Link to="/12">{'您有四份文件待处理,请尽快处理。'}</Link>
          </span>
        </div>
      </div>
    </div>
  );
}
Navigation.propTypes = {
  hide: PropTypes.bool,
};
