import axios from 'axios'
import { ActionTree, MutationTree, GetterTree } from 'vuex'
import getUrl from '../../utils/getUrl'
import { SET_SEARCHED, SET } from '../action-types'
import { SAVE_SEARCHED, SAVE, ERROR } from '../mutation-types'
import Person from '~/models/Person'

export const state = () => ({
  people: [] as Person[],
  searchedPeople: [] as Person[],
  error: undefined as string | undefined,
})

type RootState = ReturnType<typeof state>

const mutations: MutationTree<RootState> = {
  [SAVE](state: RootState, fetchedPeople: [Person]) {
    state.people = fetchedPeople
  },
  [SAVE_SEARCHED](state: RootState, searchedPeople: [Person]) {
    state.searchedPeople = searchedPeople
  },
  [ERROR](state: RootState, error: any) {
    state.error = error
  },
}

const actions: ActionTree<RootState, RootState> = {
  async [SET]({ commit }, key: string) {
    try {
      const res = await axios.get(getUrl({ route: 'person/popular', key }))
      commit(SAVE, res.data.results)
    } catch (err) {
      commit(ERROR, err.message)
    }
  },

  async [SET_SEARCHED]({ commit }: any, { query, key }: any) {
    try {
      if (!query.trim().length) {
        commit(SAVE_SEARCHED, [])
        throw new Error('No results for people')
      }
      const response = await axios.get(
        getUrl({ route: 'search/person', query, key })
      )
      commit(SAVE_SEARCHED, response.data.results)
    } catch (err) {
      commit(ERROR, err.message)
    }
  },
}

const getters: GetterTree<RootState, RootState> = {
  getSearchedPeople: (state) => state.searchedPeople,
}

export const people = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
