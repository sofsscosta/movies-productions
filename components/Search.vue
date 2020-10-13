<template>
  <form class="flex justify-center items-center pt-5 pb-5">
    <h1 class="font-hairline text-5xl pr-5">Search</h1>
    <input
      v-model="query"
      type="text"
      class="border rounded border-gray-500 w-56 h-12"
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
      //   const parsedQuery = Object.keys(this.$router.currentRoute.query)[0]
      await this['people/setSearched']({ query, key })
      await this['movies/setSearched']({ query, key })
    },
    ...mapActions(['movies/setSearched', 'people/setSearched']),
  },
}
</script>
