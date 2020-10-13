import Vuex, { ActionTree, ModuleTree, MutationTree } from 'vuex'
import { movies, people } from './modules'
import state from './state'

export type RootState = ReturnType<typeof state>

const store = () =>
  new Vuex.Store({
    modules: <ModuleTree<any>>{
      movies,
      people,
    },
    state,
    actions: <ActionTree<RootState, RootState>>{
      async nuxtServerInit({ dispatch, commit }) {
        if (process.server) {
          commit('setEnv', {
            key: process.env.API_KEY,
          })
        }
        await dispatch('movies/SET', process.env.key)
      },
    },
    mutations: <MutationTree<RootState>>{
      setEnv(state, env) {
        state.env = env
      },
    },
  })

export default store
