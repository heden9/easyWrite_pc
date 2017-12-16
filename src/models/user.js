import { routerRedux } from 'dva/router';
import { loginHandle, modifyPassword } from '../services';
import { message } from 'antd';

export default {

  namespace: 'user',

  state: {
    id: '',

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
        const  userId = data.id || '';
        window.common.writeCookie('USERID', userId, 1.0/48);
        yield put({ type: 'save', payload: { id: userId } });
        yield put(routerRedux.push('/home'));
        message.success('登录成功：)');
      }
    },
    *Modify({ payload }, { call, put }) {  // eslint-disable-line
      const { data, code, message } = yield call(modifyPassword, { ...payload });
      if (code === 1) {
        message.error(message);
        return;
      } else if (code === 0) {
        yield put(routerRedux.push('/home'));
        message.success('修改成功：)');
      }
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
