import axios from 'axios'
import { ActionTree, MutationTree } from 'vuex'
import { SET_SEARCHED, SET } from '../action-types'
import { SAVE_SEARCHED, SAVE } from '../mutation-types'
import getUrl from '../../utils/getUrl'
import Movie from '~/models/Movie'

export const state = () => ({
  topRated: [] as Movie[],
  searchedMovies: [] as Movie[],
})

type RootState = ReturnType<typeof state>

const mutations: MutationTree<RootState> = {
  [SAVE](state: RootState, fetchedMovies: [Movie]) {
    state.topRated = fetchedMovies
  },
  [SAVE_SEARCHED](state: RootState, searchedMovies: [Movie]) {
    state.searchedMovies = searchedMovies
  },
}

const actions: ActionTree<RootState, RootState> = {
  async [SET]({ commit }, key: string) {
    try {
      const res = await axios.get(getUrl({ route: 'movie/top_rated', key }))
      commit(SAVE, res.data.results)
    } catch (error) {
      throw new Error(error.message)
    }
  },
  async [SET_SEARCHED]({ commit }, { query, key }) {
    try {
      if (!query.trim().length) return commit(SAVE_SEARCHED, [])
      const response = await axios.get(
        getUrl({ route: 'search/movie', query, key })
      )
      commit(SAVE_SEARCHED, response.data.results)
    } catch (error) {
      throw new Error(error.message)
    }
  },
}

export const movies = {
  namespaced: true,
  state,
  mutations,
  actions,
}
