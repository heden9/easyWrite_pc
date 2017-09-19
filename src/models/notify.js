import { fetchInfo } from '../services';
export default {

  namespace: 'notify',

  state: {
    version: 0,
    unwrite: {
      num: 0,
      data: [

      ]
    },
    unconfirm: {
      num: 0,
      data: [

      ]
    },
    unchecked: {
      num: 0,
      data: [

      ]
    },
    finished: {
      num: 0,
      data: [

      ]
    }
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      return history.listen(({ pathname }) => {
        if(/\/file\/[1-4]/.test(pathname)){
          dispatch({type: 'fetch'});
        }
      })
    }
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      const { data: {unwrite, unconfirm, unchecked, finished} } = yield call(fetchInfo);
      yield put({ type: 'save' , payload: { unwrite, unconfirm, finished, unchecked, version: new Date().getTime() } });
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
