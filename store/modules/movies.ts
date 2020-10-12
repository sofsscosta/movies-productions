import axios from 'axios'
import getUrl from '../../utils/getUrl'
import Movie from '~/models/Movie'

export const state = {
  movies: [],
  searchedMovies: [],
  favouriteMovies: [],
  error: Error,
}

type State = {
  movies: [Movie]
  searchedMovies: [Movie]
  favouriteMovies: [Movie]
  error: string
}

const mutations = {
  set(state: State, fetchedMovies: [Movie]) {
    state.movies = fetchedMovies
  },
  setSearched(state: State, searchedMovies: [Movie]) {
    state.searchedMovies = searchedMovies
  },
  error(error: any) {
    state.error = error
  },
}

const actions = {
  async set({ commit }: any, key: string) {
    try {
      const res = await axios.get(getUrl({ route: 'movie/top_rated', key }))
      commit('set', res.data.results)
    } catch (err) {
      commit('error', err.message)
    }
  },
  async setSearched({ commit }: any, { query, key }: any) {
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

const getters = {
  getTopRatedMovies(movies: [Movie]) {
    return movies
  },
}

export const movies = {
  namespaced: true,
  state: () => state,
  mutations,
  actions,
  getters,
}
