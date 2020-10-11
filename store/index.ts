import Vuex from 'vuex'
import { movies, people } from './modules'
import state from './state'

const store = () =>
  new Vuex.Store({
    modules: {
      movies,
      people,
    },
    state,
  })

export default store
