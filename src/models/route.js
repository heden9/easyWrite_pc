
export default {

  namespace: 'route',

  state: {
    hideLeft: false,
    hideTop: false,
  },

  subscriptions: {
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
  },

  reducers: {
    hide(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
