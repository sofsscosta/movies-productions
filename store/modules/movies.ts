import axios from 'axios'
import Movie from '~/models/movie'

export const state = {
  movies: [],
  favouriteMovies: [],
}

type State = {
  movies: [Movie]
  favouriteMovies: [Movie]
}

const mutations = {
  init(state: State, fetchedMovies: [Movie]) {
    state.movies = fetchedMovies
  },
}

const actions = {
  async nuxtServerInit({ commit }: any) {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.API_KEY}&page=1`
    )
    commit('init', res.data.results)
    console.log(state.movies, 'after init')
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
