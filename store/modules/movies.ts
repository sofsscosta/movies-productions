import axios from 'axios'
import { ActionTree, MutationTree, GetterTree } from 'vuex'
import { SET_SEARCHED, SET } from '../action-types'
import { SAVE_SEARCHED, SAVE, ERROR } from '../mutation-types'
import getUrl from '../../utils/getUrl'
import Movie from '~/models/Movie'

export const state = () => ({
  movies: [] as Movie[],
  searchedMovies: [] as Movie[],
  error: undefined as string | undefined,
})

type RootState = ReturnType<typeof state>

const mutations: MutationTree<RootState> = {
  [SAVE](state: RootState, fetchedMovies: [Movie]) {
    state.movies = fetchedMovies
  },
  [SAVE_SEARCHED](state: RootState, searchedMovies: [Movie]) {
    state.searchedMovies = searchedMovies
  },
  [ERROR](state: RootState, error: Error) {
    state.error = error.message
  },
}

const actions: ActionTree<RootState, RootState> = {
  async [SET]({ commit }, key: string) {
    try {
      const res = await axios.get(getUrl({ route: 'movie/top_rated', key }))
      commit(SAVE, res.data.results)
    } catch (err) {
      commit(ERROR, err.message)
    }
  },
  async [SET_SEARCHED]({ commit }, { query, key }) {
    try {
      if (!query.trim().length) return commit(SAVE_SEARCHED, [])
      const response = await axios.get(
        getUrl({ route: 'search/movie', query, key })
      )
      commit(SAVE_SEARCHED, response.data.results)
    } catch (err) {
      commit(ERROR, err.message)
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
