import { fetchInfo } from '../services';
import { routerRedux } from 'dva/router';
export default {

  namespace: 'notify',

  state: {
    version: 0,
    unwrite: {
      num: 0,
      data: [

      ],
    },
    unconfirm: {
      num: 0,
      data: [

      ],
    },
    unchecked: {
      num: 0,
      data: [

      ],
    },
    finished: {
      num: 0,
      data: [

      ],
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      history.listen(({ pathname }) => {
        if (/\/file\/[1-4]/.test(pathname) || /\/home/.test(pathname)) {
          dispatch({ type: 'fetch' });
        }
      });
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      const { data, code, message } = yield call(fetchInfo);
      if(code === 1){
        message.error(message);
        return;
      }else if(code === 2){
        message.error('请重新登录！');
        yield put(routerRedux.push('/'));
        return;
      }
      const { unwrite, unconfirm, unchecked, finished } = data;
      yield put({ type: 'save', payload: { unwrite, unconfirm, finished, unchecked, version: new Date().getTime() } });
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    }
  },

};
