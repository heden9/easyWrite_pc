import React, { PropTypes } from 'react';
import { Link,NavLink } from 'dva/router';
import { Icon, Badge } from 'antd';
import './style.less';


export default function TabMenu({ unwrite_n, unconfirm_n, pathname, hide }) {
  if (hide) {
    return null;
  }
  return (
    <div
      className="tabMenu-container"
    >
      <NavLink to="/home" activeClassName="active" className="tab-item">
        <Icon type="home" />
          首页
      </NavLink>
      <Link className={/file\/[0-9]/.test(pathname) ? 'tab-item active' : 'tab-item'} to="file/1">
        <Icon type="file-text" />
          文件管理
        </Link>
      <ul className="submenu">
        <li><NavLink to="/file/1" activeClassName={'router-active'}>待填写<Badge count={unwrite_n} /></NavLink></li>
        <li><NavLink to="/file/2" activeClassName={'router-active'}>待修改<Badge count={unconfirm_n} /></NavLink></li>
        <li><NavLink to="/file/3" activeClassName={'router-active'}>待审批<Badge count={unconfirm_n} style={{ background: 'rgb(160, 208, 243)' }} /></NavLink></li>
        <li><NavLink to="/file/4" activeClassName={'router-active'}>已完成</NavLink></li>
      </ul>
      <div className="tab-item">
        <Icon type="appstore" />
          功能
        </div>
      <ul className="submenu">
        <li><Link to="/">信息查看</Link></li>
        <li><Link to="/">信息添加</Link></li>
        <li><Link to="/">我的收藏</Link></li>
      </ul>
      <div className="tab-item">
        <Icon type="team" />
          群发管理
        </div>
      <ul className="submenu">
        <li><Link to="/">新建群发</Link></li>
        <li><Link to="/">审批管理</Link></li>
      </ul>
    </div>
  );
}
TabMenu.propTypes = {
  unwrite_n: PropTypes.number,
  unconfirm_n: PropTypes.number,
  finished_n: PropTypes.number,
  pathname: PropTypes.string,
  hide: PropTypes.bool,
};
