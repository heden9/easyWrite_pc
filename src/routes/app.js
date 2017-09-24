import React, { PropTypes } from 'react';
import { connect } from 'dva';
import NProgress from 'nprogress';
import Loader from '../components/Loader';
import Navigation from '../components/Navigation';
import TabMenu from '../components/TabMenu';
import pathToRegexp from 'path-to-regexp';
import { withRouter } from 'dva/router'
import './app.less';
let lastHref;
function App({ children, notify, loading, location: { pathname }, hideLeft, hideTop }) {
  const href = window.location.href;
  const notifyInfo = {
    unwrite_n: parseInt(notify.unwrite.num),
    unconfirm_n: parseInt(notify.unconfirm.num),
    finished_n: parseInt(notify.finished.num),
  };
  if (lastHref !== href) {
    NProgress.start();
    if (!loading.global) {
      NProgress.done();
      lastHref = href
    }
  }
  if(pathname === '/'){
    return (
      <div>{children}</div>
    )
  }else{
    return (
      <div id="app-container">
        <Loader fullScreen spinning={false} />
        <Navigation hide={hideTop}/>
        {
          pathname.indexOf('/write/') !== -1 ? <div className="wrapper">{children}</div> :
            <div className="app-content">
              <TabMenu {...notifyInfo}  pathname={pathname} hide={hideLeft} />
              <div className="app-main-body">
                <Crumbs pathname={pathname} />
                {children}
              </div>
            </div>
        }
      </div>
    );
  }

}

const ROUTE = {
  file: {
    host: '文件管理',
    1: '待填写',
    2: '待修改',
    3: '待审批',
    4: '已完成',
  },
};
function Crumbs({ pathname }) {
  const match = pathToRegexp('/:file/:fileId([1-4])').exec(pathname);
  if(!match){
    return <div/>
  }
  if (pathname === '/home') { return <div className="crumbs">首页</div>; }
  if (!ROUTE[match[1]] || !ROUTE[match[1]][match[2]]) {
    return <div/>;
  } else {
    return (
      <div className="crumbs">
        {
          `${ROUTE[match[1]].host} - ${ROUTE[match[1]][match[2]]}`
        }
      </div>
    );
  }
}
Crumbs.propTypes = {
  pathname: PropTypes.string,
};
function mapStateToProps({ notify, route: { hideLeft, hideTop }, loading }) {
  return {
    notify,
    hideLeft,
    hideTop,
    loading
  };
}
export default withRouter(connect(mapStateToProps)(App));
