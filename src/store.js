import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: []
  },
  mutations: {
    UPDATE_TASK (state, task) {
      state.list = state.list.map(item => {
        if (item.id == task.id ) item = task
        return item
      })
    },
    DELETE_TASK (state, task) {
      state.list = state.list.filter(item => item.id != task.id)
    }
  },
  actions: {
    updateTask ({commit}, task) {
      commit('UPDATE_TASK', task);
    },
    deleteTask ({commit}, task) {
      commit('DELETE_TASK', task);
    }
  }
})
