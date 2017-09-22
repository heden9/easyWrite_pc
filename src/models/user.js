import { loginHandle } from '../services';
import { message } from 'antd';
export default {

  namespace: 'user',

  state: {
    username: '',

  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      return history.listen(({pathname})=>{

      })
    },
  },

  effects: {
    *Login({ payload }, { call, put }) {  // eslint-disable-line
      const { data: { code , data, message} } = yield call(loginHandle, { ...payload });
      if(code !== 0){
        message.error(message);
        return;
      }
      message.success('登录成功：)');
      if(data.url){
        location.href = data.url;
      }
      yield put({ type: 'save' });
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
