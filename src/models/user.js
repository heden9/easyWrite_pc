import { routerRedux } from 'dva/router';
import { loginHandle } from '../services';
import { message } from 'antd';
export default {

  namespace: 'user',

  state: {
    username: '',

  },

  subscriptions: {
    setup({ history }) {  // eslint-disable-line
      return history.listen(({ pathname }) => {

      });
    },
  },

  effects: {
    *Login({ payload }, { call, put }) {  // eslint-disable-line
      const { data, code, message } = yield call(loginHandle, { ...payload });
      if(code !== 0){
        message.error(message);
        return;
      }
      message.success('登录成功：)');
      if (data.url) {
        location.href = data.url;
      }
      if (data.username){
        yield put(routerRedux.push('/home'));
        yield put({ type: 'save' ,payload: { username: data.username}});
      }
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
