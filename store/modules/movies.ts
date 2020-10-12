import Movie from '~/models/Movie'

export const state = {
  movies: [],
  favouriteMovies: [],
  error,
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
}

const actions = {
  setError({ error, commit }: any) {
    state.error = error
    commit('error', error)
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
