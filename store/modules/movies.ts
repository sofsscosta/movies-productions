import Movie from '~/models/movie'

export const movies = {
  state: () => ({
    movies: [],
    favouriteMovies: [],
  }),
  mutations: {
    init(movies: [Movie], fetchedMovies: [Movie]) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      movies = fetchedMovies
    },
    // favourite()
  },
  actions: {},
  getters: {
    getTopRatedMovies(movies: [Movie]) {
      return movies
    },
  },
}
