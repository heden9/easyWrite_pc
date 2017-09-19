import React, { PropTypes } from 'react';
import { connect } from 'dva';
import Navigation from '../components/Navigation';
import { Breadcrumb } from 'antd';
import TabMenu from '../components/TabMenu';
import './app.less';

function App({children, notify, location: {pathname}, hideLeft, hideTop }) {
  const notifyInfo = {
    unwrite_n: parseInt(notify.unwrite.num),
    unconfirm_n: parseInt(notify.unconfirm.num),
    finished_n: parseInt(notify.finished.num),
  };
  return (
    <div id="app-container">
      <Navigation hide={hideTop}/>
      <div className="app-content">
        <TabMenu {...notifyInfo} pathname={pathname} hide={hideLeft}/>
        <div className="app-main-body">
          <Crumbs pathname={pathname}/>
          {children}
        </div>
      </div>
    </div>
  )
}

const ROUTE = {
  file: {
    host: '文件管理',
    1: '待填写',
    2: '待修改',
    3: '待审批',
    4: '已完成'
  }
};
function Crumbs({pathname}) {
  const temp = pathname.split('/').filter((item)=>(
    item !== '' && item
  ));
  if(pathname === '/home')
    return <div className="crumbs">首页</div>;
  if(ROUTE[temp[0]] == null){
    return null;
  }else
    return (
      <div className="crumbs">
        {
          ROUTE[temp[0]]['host'] + ' - ' + ROUTE[temp[0]][temp[1]]
        }
      </div>
    )
}
Crumbs.propTypes = {
  pathname: PropTypes.string
};
function mapStateToProps({ notify, route: { hideLeft, hideTop } }) {
  return {
    notify,
    hideLeft,
    hideTop
  }
}
export default connect(mapStateToProps)(App);
