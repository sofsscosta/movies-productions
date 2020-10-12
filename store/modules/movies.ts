import axios from 'axios'
import getUrl from '../../utils/getUrl'
import Movie from '~/models/Movie'

export const state = {
  movies: [],
  favouriteMovies: [],
  error: Error,
}

type State = {
  movies: [Movie]
  favouriteMovies: [Movie]
  error: string
}

const mutations = {
  init(state: State, fetchedMovies: [Movie]) {
    state.movies = fetchedMovies
  },
  error(error: any) {
    state.error = error
  },
}

const actions = {
  async init({ commit }: any, key: string) {
    try {
      const res = await axios.get(getUrl({ route: 'movie/top_rated', key }))
      commit('init', res.data.results)
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
