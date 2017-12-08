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
      if (code === 1) {
        message.error(message);
        return;
      } else if (code === 3) {
        location.href = data.url;
      } else if (code === 0) {
        yield put(routerRedux.push('/home'));
        yield put({ type: 'save', payload: { username: data.username } });
        message.success('登录成功：)');
      }
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
