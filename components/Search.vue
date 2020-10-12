<template>
  <form class="pa3 pa5-ns">
    <h1>Search</h1>
    <input
      v-model="query"
      type="text"
      action="/search"
      @keyup="search(query)"
    />
  </form>
</template>

<script lang="ts">
import { mapActions } from 'vuex'

export default {
  methods: {
    async search(query: string) {
      const key = this.$store.state.env.key
      await this.$router.push('/search?' + query)
      const parsedQuery = Object.keys(this.$router.currentRoute.query)[0]
      await this['people/setSearched']({ query: parsedQuery, key })
      await this['movies/setSearched']({ query: parsedQuery, key })
    },
    ...mapActions(['movies/setSearched', 'people/setSearched']),
  },
}
</script>
