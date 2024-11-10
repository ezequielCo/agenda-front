import { createStore } from 'vuex'

export default createStore({
  state: {
    isAuthenticated: false,
    userData: null
  },
  mutations: {
    setAuthentication(state, value) {
      state.isAuthenticated = value
    },
    setUser(state, user) {
      state.userData = user
    },
    clearUser(state) {
      state.isAuthenticated = false
      state.userData = null
    }
  },
  actions: {
    async checkAuthentication({ commit }, token) {
      try {
        const response = await $fetch('http://127.0.0.1:8000/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        }).then(response => {
          commit('setUser', response)
          commit('setAuthentication', true)
          return response;
        });
    
      } catch (error) {
        commit('clearUser')
        throw error
      }
    }
  }
})
