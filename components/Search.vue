<template>
  <form class="pa3 pa5-ns">
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
    search(query: string) {
      this.$router.push('/search?' + query)
      const key = this.$store.state.env.key
      console.log('key in compo', key)
      this['movies/setSearched']({ query, key })
      this['people/setSearched']({ query, key })
    },
    ...mapMutations(['movies/set']),
    ...mapActions(['movies/setSearched', 'people/setSearched']),
  },
}
</script>
