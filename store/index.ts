import Vuex from 'vuex'
import { movies, people } from './modules'

const store = () =>
  new Vuex.Store({
    modules: {
      movies,
      people,
    },
  })

export default store
