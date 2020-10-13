import axios from 'axios'
import { ActionTree, MutationTree } from 'vuex'
import getUrl from '../../utils/getUrl'
import { SEARCH_PEOPLE, SET_PEOPLE } from '../action-types'
import Person from '~/models/Person'

export const state = () => ({
  people: [] as Person[],
  searchedPeople: [] as Person[],
  error: undefined as string | undefined,
})

type RootState = ReturnType<typeof state>

const mutations: MutationTree<RootState> = {
  set(state: RootState, fetchedPeople: [Person]) {
    state.people = fetchedPeople
  },
  setSearched(state: RootState, searchedPeople: [Person]) {
    state.searchedPeople = searchedPeople
  },
  error(state: RootState, error: any) {
    state.error = error
  },
}

const actions: ActionTree<RootState, RootState> = {
  async [SET_PEOPLE]({ commit }, key: string) {
    try {
      const res = await axios.get(getUrl({ route: 'person/popular', key }))
      commit('set', res.data.results)
    } catch (err) {
      commit('error', err.message)
    }
  },
  async [SEARCH_PEOPLE]({ commit }: any, { query, key }: any) {
    try {
      if (!query.trim().length) {
        commit('setSearched', [])
        throw new Error('No results for people')
      }
      const response = await axios.get(
        getUrl({ route: 'search/person', query, key })
      )
      commit('setSearched', response.data.results)
    } catch (err) {
      commit('error', err.message)
    }
  },
}

export const people = {
  namespaced: true,
  state,
  mutations,
  actions,
}
