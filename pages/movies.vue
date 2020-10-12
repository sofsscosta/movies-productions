<template>
  <div>
    <ul>
      <li v-for="movie in movies" :key="movie.id">
        <p>{{ movie.title }}</p>
        <img :src="getImageUrl(movie.poster_path)" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { mapState, mapGetters } from 'vuex'
import axios from 'axios'
import { getImageUrl } from '../utils/getImageUrl'
import getUrl from '../utils/getUrl'

export default {
  async fetch({ store }: any) {
    try {
      if (store.state.movies.movies.length) return store.state.movies.movies
      const res = await axios.get(
        getUrl({ route: 'movie/top_rated', key: store.state.env.key })
      )
      store.commit('movies/init', res.data.results)
    } catch (err) {
      store.commit('movies/error', err)
    }
  },

  computed: {
    ...mapState({
      movies: (state: any) => {
        return state.movies.movies
      },
      error: (state: any) => {
        return state.movies.error
      },
    }),
  },

  methods: {
    getImageUrl,
    ...mapGetters(['movies/getTopRatedMovies']),
  },
}
</script>
