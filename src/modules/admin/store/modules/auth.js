import * as types from '../mutation-types'
import api from 'api/login.js'
// 初始化从本地获取 token
const state = {
  token: sessionStorage.getItem('mmblog-token')
};
// Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象
// state, getters, commit(), dispatch()
const actions = {
  createToken({ commit, state }, { username, password }) {
    return api.createToken(username, password).then(res => {
      if (res.data.success) {
        // 登录成功返回 token,通过 mutation 创建本地 token
        commit(types.CREATE_TOKEN, res.data.token);
      } else {
        // 登录失败，删除原有本地 token
        commit(types.DELETE_TOKEN);
      }
      // 创建 Promise, 返回登录后的用户信息
      return new Promise((resolve, reject) => {
        resolve(res);
      });
    });
  }
}

const mutations = {
  // mutation 函数参数为 state, payload
  [types.CREATE_TOKEN](state, token) {
    state.token = token;
    sessionStorage.setItem('mmblog-token', token);
  },
  [types.DELETE_TOKEN](state) {
    state.token = null;
    sessionStorage.setItem('mmblog-token', '');
  }
}

export default {
  state,
  actions,
  mutations
}
