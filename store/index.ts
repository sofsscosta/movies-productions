import Vuex, { ActionTree, ModuleTree, MutationTree } from 'vuex'
import { movies, people } from './modules'
import { SET_QUERY, SET_ENV } from './mutation-types'
import state from './state'

export type RootState = ReturnType<typeof state>

const mutations: MutationTree<RootState> = {
  [SET_ENV](state, env) {
    state.env = env
  },
  [SET_QUERY](state, query) {
    state.query = query
  },
}

const actions: ActionTree<RootState, RootState> = {
  async nuxtServerInit({ dispatch, commit }) {
    if (process.server) {
      commit(SET_ENV, {
        key: process.env.API_KEY,
      })
    }
    await dispatch('movies/GET', process.env.key)
  },
}

const store = () =>
  new Vuex.Store({
    modules: <ModuleTree<any>>{
      movies,
      people,
    },
    state,
    actions,
    mutations,
  })

export default store
