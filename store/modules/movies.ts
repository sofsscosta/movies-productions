import axios from 'axios'
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
  async init({ commit }: any, key: string | undefined = process.env.API_KEY) {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&page=1`
      )
      commit('init', res.data.results)
    } catch (err) {
      console.log(err.message)
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
