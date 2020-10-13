import { movies, people } from './modules'

const state = () => {
  return {
    page: 1,
    env: {
      key: process.env.API_KEY,
    },
    movies,
    people,
  }
}

export default state
