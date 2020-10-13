import axios from 'axios'
import { ActionTree, MutationTree, GetterTree } from 'vuex'
import { GET_SEARCH, GET } from '../action-types'
import { SET_SEARCH, SET } from '../mutation-types'
import getUrl from '../../utils/getUrl'
import Movie from '~/models/Movie'

export const state = () => ({
  topRated: [] as Movie[],
  searchedMovies: [] as Movie[],
})

type RootState = ReturnType<typeof state>

const mutations: MutationTree<RootState> = {
  [SET](state: RootState, fetchedMovies: [Movie]) {
    state.topRated = fetchedMovies
  },
  [SET_SEARCH](state: RootState, searchedMovies: [Movie]) {
    state.searchedMovies = searchedMovies
  },
}

const actions: ActionTree<RootState, RootState> = {
  async [GET]({ commit }, key: string) {
    try {
      const res = await axios.get(getUrl({ route: 'movie/top_rated', key }))
      commit(SET, res.data.results)
    } catch (error) {
      throw new Error(error.message)
    }
  },
  async [GET_SEARCH]({ commit }, { query, key }) {
    try {
      if (!query.trim().length) return commit(SET_SEARCH, [])
      const response = await axios.get(
        getUrl({ route: 'search/movie', query, key })
      )
      commit(SET_SEARCH, response.data.results)
    } catch (error) {
      throw new Error(error.message)
    }
  },
}

const getters: GetterTree<RootState, RootState> = {
  getSearchedMovies: (state) => state.searchedMovies,
}

export const movies = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
