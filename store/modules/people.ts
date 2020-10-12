import axios from 'axios'
import getUrl from '../../utils/getUrl'
import Person from '~/models/Person'

export const state = {
  people: [],
  searchedPeople: [],
  favouritePeople: [],
  error: Error,
}

type State = {
  people: [Person]
  searchedPeople: [Person]
  favouritePeople: [Person]
  error: string
}

const mutations = {
  set(state: State, fetchedPeople: [Person]) {
    state.people = fetchedPeople
  },
  setSearched(state: State, searchedPeople: [Person]) {
    state.searchedPeople = searchedPeople
  },
  error(error: any) {
    state.error = error
  },
}

const actions = {
  async set({ commit }: any, key: string) {
    try {
      const res = await axios.get(getUrl({ route: 'person/popular', key }))
      commit('set', res.data.results)
    } catch (err) {
      commit('error', err.message)
    }
  },
  async setSearched({ commit }: any, { query, key }: any) {
    try {
      if (!query.trim().length) return commit('setSearched', [])
      const response = await axios.get(
        getUrl({ route: 'search/person', query, key })
      )
      commit('setSearched', response.data.results)
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
