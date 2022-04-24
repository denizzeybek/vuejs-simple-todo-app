import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos:[],
  },
  getters: {
    getToDoList(state){
      return state.todos;
    }, 
  },
  mutations: {
    add_list(state, item){
      state.todos.push(item);
    },
    delete_item(state, id){
      state.todos = state.todos.filter((todo) => todo.id != id )
    },
    update_item(state, data){
      let index = state.todos.findIndex( (todos) => todos.id == data.id)
      if(index != -1){
        state.todos[index] = data
      }
    }
  },
  actions: {
    addList({commit}, item){
      commit("add_list", item);
    },
    deleteItem({commit}, id){
      commit('delete_item', id)
    },
    updateItem({commit}, data){
      console.log("here")
      commit('update_item', data)
    }
  } 
})
