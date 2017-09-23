import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'dva/router';
import { Icon } from 'antd';
import './style.less';

export default function Navigation({ hide }) {
  if (hide) {
    return null;
  }
  return (
    <div className="nav-container slideInDown animated">
      <div className="wrapper">
        <div className="btn-group">
          <Link>
            <Icon type="solution" />
            人员管理
          </Link>
          <Link>
            <Icon type="unlock" />
            修改密码
          </Link>
          <IndexLink to="/">
            <Icon type="poweroff" />
            退出系统
          </IndexLink>
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
