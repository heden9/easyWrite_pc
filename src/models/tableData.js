import { fetchTableData, submitHandle } from '../services';
import { routerRedux } from 'dva/router';
import { message, Modal } from 'antd';
const confirm = Modal.confirm;
export default {
  namespace: 'tableData',
  state: {

  },
  subscriptions: {
  },

  effects: {
    *fetch({ payload }, { call, put, select }) {  // eslint-disable-line
      const { data, code, message } = yield call(fetchTableData, { ...payload });
      if(code === 1){
        message.error(message);
        return;
      }else if(code === 2){
        message.error('请重新登录！');
        yield put(routerRedux.push('/'));
        return;
      }
      const resource = yield select(state => state['tableData'][payload.id]);
      if(!resource){
        message.success('已拉取最新数据！');
        yield put({ type: 'save', payload: { [payload.id]: data } });
        return;
      }
      if(data.version !== resource.version){
        if(yield call(showConfirm))
          yield put({ type: 'save', payload: { [payload.id]: data } });
      }
    },
    *submit({ payload }, { call, put }) {  // eslint-disable-line
      const { data, code, message } = yield call(submitHandle, { ...payload });
      if(code === 1){
        message.error(message);
        return;
      }else if(code === 2){
        message.error('请重新登录！');
        yield put(routerRedux.push('/'));
        return;
      }
      message.success('提交成功！');
      if(data.url){
        location.href = data.url;
      }else{
        yield put({ type: 'save', payload: { [payload.id]: null } });
      }
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
};


async function showConfirm() {
  return await new Promise((resolve, reject)=>{
    confirm({
      title: '是否拉取最新数据?',
      content: '远端数据已更新，点击确认放弃本地草稿',
      onOk() {
        resolve(true);
      },
      onCancel() {
        resolve(false);
      },
    });
  })
}
