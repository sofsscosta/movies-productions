import axios from 'axios'
import { ActionTree, MutationTree } from 'vuex'
import getUrl from '../../utils/getUrl'
import Movie from '~/models/Movie'

export const state = () => ({
  movies: [] as Movie[],
  searchedMovies: [] as Movie[],
  error: undefined as string | undefined,
})

type RootState = ReturnType<typeof state>

const mutations: MutationTree<RootState> = {
  set(state: RootState, fetchedMovies: [Movie]) {
    state.movies = fetchedMovies
  },
  setSearched(state: RootState, searchedMovies: [Movie]) {
    state.searchedMovies = searchedMovies
  },
  error(state: RootState, error: Error) {
    state.error = error.message
  },
}

const actions: ActionTree<RootState, RootState> = {
  async set({ commit }, key: string) {
    try {
      const res = await axios.get(getUrl({ route: 'movie/top_rated', key }))
      commit('set', res.data.results)
    } catch (err) {
      commit('error', err.message)
    }
  },
  async setSearched({ commit }, { query, key }) {
    try {
      if (!query.trim().length) return commit('setSearched', [])
      const response = await axios.get(
        getUrl({ route: 'search/movie', query, key })
      )
      commit('setSearched', response.data.results)
    } catch (err) {
      commit('error', err.message)
    }
  },
}

export const movies = {
  namespaced: true,
  state,
  mutations,
  actions,
}
