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
            API_KEY: process.env.API_KEY,
          })
        }
        await dispatch('movies/set', process.env.API_KEY)
      },
    },
    mutations: {
      setEnv(state, env) {
        state.env = env
      },
    },
  })

export default store
