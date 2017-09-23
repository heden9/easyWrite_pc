
export default {

  namespace: 'route',

  state: {
    hideLeft: false,
    hideTop: false,
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      return history.listen(({ pathname }) => {
        // if(pathname === '/'){
        //   dispatch({type: 'hide', payload: { hideTop: true, hideLeft: true }})
        // }else{
        //   dispatch({type: 'hide', payload: { hideTop: false, hideLeft: false }})
        // }
      });
    },
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
