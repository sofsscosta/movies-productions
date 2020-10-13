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
import { mapMutations, createNamespacedHelpers } from 'vuex'
import { GET_SEARCH } from '~/store/action-types'
import { SET_QUERY } from '~/store/mutation-types'

const { mapActions: mapMovieActions } = createNamespacedHelpers('movies')
const { mapActions: mapPeopleActions } = createNamespacedHelpers('people')

export default {
  data() {
    return { query: '' }
  },
  methods: {
    async search(query: string) {
      const key = this.$store.state.env.key
      await this.$router.push('?' + query)
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
