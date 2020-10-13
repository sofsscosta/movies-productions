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
import { mapActions } from 'vuex'

export default {
  data() {
    return { query: '' }
  },
  methods: {
    async search(query: string) {
      const key = this.$store.state.env.key
      await this.$router.push('?' + query)
      await this.setQuery(query)
      await this['people/SET_SEARCHED']({ query, key })
      await this['movies/SET_SEARCHED']({ query, key })
    },
    ...mapActions(['movies/SET_SEARCHED', 'people/SET_SEARCHED', 'setQuery']),
  },
}
</script>
