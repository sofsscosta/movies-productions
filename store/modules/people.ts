import axios from 'axios'
import { ActionTree, MutationTree } from 'vuex'
import getUrl from '../../utils/getUrl'
import { GET_SEARCH, GET } from '../action-types'
import { SET_SEARCH, SET } from '../mutation-types'
import Person from '~/models/Person'

export const state = () => ({
  popular: [] as Person[],
  searchedPeople: [] as Person[],
  error: undefined as string | undefined,
})

type RootState = ReturnType<typeof state>

const mutations: MutationTree<RootState> = {
  [SET](state: RootState, fetchedPeople: [Person]) {
    state.popular = fetchedPeople
  },
  [SET_SEARCH](state: RootState, searchedPeople: [Person]) {
    state.searchedPeople = searchedPeople
  },
}

const actions: ActionTree<RootState, RootState> = {
  async [GET]({ commit }, key: string) {
    try {
      const res = await axios.get(getUrl({ route: 'person/popular', key }))
      commit(SET, res.data.results)
    } catch (error) {
      throw new Error(error.message)
    }
  },
  async [GET_SEARCH]({ commit }, { query, key }) {
    try {
      if (!query.trim().length) {
        return commit(SET_SEARCH, [])
      }
      const response = await axios.get(
        getUrl({ route: 'search/person', query, key })
      )
      commit(SET_SEARCH, response.data.results)
    } catch (error) {
      throw new Error(error.message)
    }
  },
}

export const people = {
  namespaced: true,
  state,
  mutations,
  actions,
}
