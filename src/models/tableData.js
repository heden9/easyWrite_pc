import { fetchTableData } from '../services';

export default {
  namespace: 'tableData',
  state: {

  },
  subscriptions: {
    // setup({ dispatch, history }) {  // eslint-disable-line
    //   return history.listen(({pathname}) => {
    //     if(pathname.indexOf('/write/') !== -1){
    //       dispatch({ type: 'hide', payload: { hideLeft: true }});
    //     }
    //   });
    // }
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      const { data } = yield call(fetchTableData, { ...payload });
      yield put({ type: 'save', payload: { [payload.id]: data } });
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
