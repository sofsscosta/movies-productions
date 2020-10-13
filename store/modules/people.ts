import axios from 'axios'
import { ActionTree, MutationTree } from 'vuex'
import getUrl from '../../utils/getUrl'
import { SET_SEARCHED, SET } from '../action-types'
import { SAVE_SEARCHED, SAVE } from '../mutation-types'
import Person from '~/models/Person'

export const state = () => ({
  popular: [] as Person[],
  searchedPeople: [] as Person[],
  error: undefined as string | undefined,
})

type RootState = ReturnType<typeof state>

const mutations: MutationTree<RootState> = {
  [SAVE](state: RootState, fetchedPeople: [Person]) {
    state.popular = fetchedPeople
  },
  [SAVE_SEARCHED](state: RootState, searchedPeople: [Person]) {
    state.searchedPeople = searchedPeople
  },
}

const actions: ActionTree<RootState, RootState> = {
  async [SET]({ commit }, key: string) {
    try {
      const res = await axios.get(getUrl({ route: 'person/popular', key }))
      commit(SAVE, res.data.results)
    } catch (error) {
      throw new Error(error.message)
    }
  },
  async [SET_SEARCHED]({ commit }: any, { query, key }: any) {
    try {
      if (!query.trim().length) {
        return commit(SAVE_SEARCHED, [])
      }
      const response = await axios.get(
        getUrl({ route: 'search/person', query, key })
      )
      commit(SAVE_SEARCHED, response.data.results)
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
