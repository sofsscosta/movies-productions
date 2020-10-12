<template>
  <div>
    <ul v-for="movie in movies" :key="movie">
      <li>
        <title>{{ movie.title }}</title>
      </li>
      <li></li>
    </ul>
  </div>
</template>

<script lang="ts">
import { mapState, mapActions } from 'vuex'
import axios from 'axios'

export default {
  async fetch({ store, error }) {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.API_KEY}&page=1`
      )
      console.log(res.data)
      if (res) store.commit('init', res.data.results)
    } catch (err) {
      error({ statusCode: 500, message: 'Opps, try again' })
    }
  },

  data() {
    return {
      task: 'some task',
    }
  },

  computed: {
    ...mapState({
      movies: (state: any) => state.movies,
    }),
  },

  methods: {
    ...mapActions(['add', 'remove', 'toggle']),
  },
}
</script>
