<template>
  <form class="pa3 pa5-ns">
    <input v-model="query" type="text" @keyup="search(query)" />
    <!-- <input
      v-if="$nuxt.$route.path === '/people'"
      type="submit"
      value="Search Popular People"
      :bind="query"
      :to="'/search/people/' + query"
    />
    <input
      v-if="$nuxt.$route.path === '/'"
      type="submit"
      value="Search Top Rated Movies"
    /> -->
  </form>
</template>

<script lang="ts">
import { mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  methods: {
    async search(query: string) {
      const key = this.$store.state.env.API_KEY
      if (!query) return this.$store.dispatch('movies/set', key)
      await this.$store.dispatch('movies/setSearched', query, key)
    },
    ...mapMutations(['movies/set']),
    ...mapGetters(['movies/getSearched, getTopRatedMovies']),
    ...mapActions(['movies/setSearched']),
  },
}
</script>
