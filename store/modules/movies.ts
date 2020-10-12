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

const actions = {}

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
