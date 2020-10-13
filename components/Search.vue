<template>
  <form
    class="flex justify-center items-center pt-5 pb-5"
    @submit.prevent="search(query)"
  >
    <h1 class="font-hairline text-5xl pr-5">Search</h1>
    <nuxt-link to="/search">
      <input
        v-model="query"
        type="text"
        class="border rounded border-gray-500 w-56 h-12"
        @keyup="search(query)"
      />
    </nuxt-link>
  </form>
</template>

<script lang="ts">
/* eslint-disable no-undef */
/* eslint-disable valid-typeof */
import { mapMutations, createNamespacedHelpers } from 'vuex'
import { GET_SEARCH } from '~/store/action-types'
import { SET_QUERY } from '~/store/mutation-types'

const { mapActions: mapMovieActions } = createNamespacedHelpers('movies')
const { mapActions: mapPeopleActions } = createNamespacedHelpers('people')

export default {
  data() {
    return { query: '' }
  },
  mounted() {
    if (
      this.$router.currentRoute.path === '/search' &&
      this.$router.currentRoute.query &&
      this.$router.currentRoute.query.q &&
      this.$router.currentRoute.query.q.length &&
      !Array.isArray(this.$router.currentRoute.query.q)
    ) {
      this.search(this.$router.currentRoute.query.q)
    }
  },
  methods: {
    async search(query: string) {
      const key = this.$store.state.env.key
      await this.$router.push('?q=' + query)
      await this.setQuery(query)
      await this.getMoviesSearch({ query, key })
      await this.getPeopleSearch({ query, key })
    },
    ...mapMovieActions({
      getMoviesSearch: GET_SEARCH,
    }),
    ...mapPeopleActions({
      getPeopleSearch: GET_SEARCH,
    }),
    ...mapMutations({
      setQuery: SET_QUERY,
    }),
  },
}
</script>
