import Vuex from 'vuex'
import { movies, people } from './modules'
import state from './state'

const store = () =>
  new Vuex.Store({
    modules: {
      movies,
      people,
    },
    state,
    actions: {
      async nuxtServerInit({ dispatch, commit }) {
        if (process.server) {
          commit('setEnv', {
            key: process.env.API_KEY,
          })
        }
        await dispatch('movies/set', process.env.key)
      },
    },
    mutations: {
      setEnv(state, env) {
        state.env = env
      },
    },
  })

export default store
