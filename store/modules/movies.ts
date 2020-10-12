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
  setSearched(state: State, fetchedMovies: [Movie]) {
    state.searchedMovies = fetchedMovies
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
  async setSearched({ commit }: any, query: string, key: string) {
    try {
      const res = await axios.get(
        getUrl({ route: 'movie/top_rated', query, key })
      )
      commit('setSearched', res.data.results)
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
