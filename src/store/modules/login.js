export default {
  namespaced: true,
  state: {
    userInfo: {
      username: '',
      token: ''
    }
  },
  mutations: {
    setUser(state, payload) {
      state.userInfo = payload;
    },
    deleteUser(state) {
      state.userInfo = { username: '', token: '' };
    }
  }
}
