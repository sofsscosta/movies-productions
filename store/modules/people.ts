import axios from 'axios'
import Person from '~/models/Person'

export const state = {
  people: [],
  favouritePeople: [],
  error: Error,
}

type State = {
  people: [Person]
  favouritePeople: [Person]
  error: string
}

const mutations = {
  init(state: State, fetchedPeople: [Person]) {
    state.people = fetchedPeople
  },
  error(error: any) {
    state.error = error
  },
}

const actions = {
  async init({ commit }: any, key: string) {
    try {
      console.log('key', key)
      const res = await axios.get(
        `https://api.themoviedb.org/3/person/popular?api_key=${key}&page=1`
      )
      commit('init', res.data.results)
    } catch (err) {
      console.log(err.message)
      commit('error', err.message)
    }
  },
}

const getters = {
  getPopularPeople(people: [Person]) {
    return people
  },
}

export const people = {
  namespaced: true,
  state: () => state,
  mutations,
  actions,
  getters,
}
