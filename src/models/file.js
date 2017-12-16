import { routerRedux } from 'dva/router';
import { refresh } from '../services';
export default {

  namespace: 'file',

  state: {
    fileList: []
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      history.listen(({ pathname }) => {
        if (pathname === '/home') {
          dispatch({ type: 'fetch' });
        }
      });
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      const { data, code, message } = yield call(refresh);
      if (code === 1) {
        message.error(message);
        return;
      } else if (code === 2) {
        yield put(routerRedux.push('/login'));
      } else if (code === 0) {
        yield put({ type: 'save', payload: { fileList: data['file_exists_name'] } });
      }
    },
    *delete({ payload }, { call, put }) {  // eslint-disable-line
      console.log(payload);
      yield put({ type: 'clearByFileName', payload: { fileName: payload.fileName }});
      yield put(routerRedux.goBack());
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, fileList: [...action.payload.fileList] };
    },
    clearByFileName(state, action) {
      console.log(action);
      return {
        ...state,
        fileList: state.fileList.filter((item) => {
          if (item.response.filename !== action.payload.fileName){
            return item;
          }
        }) }
    }
  },

};
