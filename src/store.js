import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: [
      {
        id: 1,
        title: 'tarefa 1',
        status: 'open'
      },
      {
        id: 2,
        title: 'tarefa 2',
        status: 'closed'
      },
      {
        id: 3,
        title: 'tarefa 3',
        status: 'open'
      },
      {
        id: 4,
        title: 'tarefa 4',
        status: 'open'
      },
      {
        id: 5,
        title: 'tarefa 5',
        status: 'closed'
      },
      {
        id: 6,
        title: 'tarefa 6',
        status: 'closed'
      },
      {
        id: 7,
        title: 'tarefa 7',
        status: 'open'
      },
      {
        id: 8,
        title: 'tarefa 8',
        status: 'open'
      },
      {
        id: 9,
        title: 'tarefa 9',
        status: 'open'
      },
      {
        id: 10,
        title: 'tarefa 10',
        status: 'closed'
      },
    ],
    errors: [],
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
    },
    ADD_ERROR (state, error) {
      state.errors.push(error)
    },
    CLEAR_ERRORS (state) {
      state.errors = []
    },
  },
  actions: {
    updateTask ({commit}, task) {
      commit('UPDATE_TASK', task);
    },
    deleteTask ({commit}, task) {
      commit('DELETE_TASK', task);
    },
    addError ({commit}, error) {
      commit('ADD_ERROR', error);
    },
    clearErrors ({commit}) {
      commit('CLEAR_ERRORS');
    }
  }
})
