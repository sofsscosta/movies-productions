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
}

const setError = ({ error, commit }: any) => {
  if (error) {
    this.error = error
    commit('error', error)
  }
}

const actions = {
  async setPeople({ commit }: any) {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/people/popular?api_key=${key}&page=1`
      )
      commit('init', res.data.results)
    } catch (err) {
      setError(err)
    }
  },
  setError,
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
