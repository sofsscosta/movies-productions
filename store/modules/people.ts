import axios from 'axios'
import getUrl from '../../utils/getUrl'
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
      const res = await axios.get(getUrl({ route: 'person/popular', key }))
      commit('init', res.data.results)
    } catch (err) {
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
