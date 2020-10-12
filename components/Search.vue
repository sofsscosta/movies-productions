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
import { mapMutations, mapActions } from 'vuex'

export default {
  methods: {
    async search(query: string) {
      this.$router.push('/search?' + query)
      const key = this.$store.state.env.key
      await this['people/setSearched']({ query, key })
      await this['movies/setSearched']({ query, key })
    },
    ...mapMutations(['movies/set']),
    ...mapActions(['movies/setSearched', 'people/setSearched']),
  },
}
</script>
