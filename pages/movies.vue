<template>
  <div>
    <ul>
      <li v-for="movie in movies" :key="movie.id">
        <div v-if="movie.poster_path" :bind="movie">
          <Movie :movie="movie" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { mapState } from 'vuex'
import axios from 'axios'
import { getImageUrl } from '../utils/getImageUrl'
import getUrl from '../utils/getUrl'
import Movie from '~/components/Movie.vue'

export default {
  components: {
    Movie,
  },
  async fetch({ store }: any) {
    try {
      if (store.state.movies.movies.length) return store.state.movies.movies
      const res = await axios.get(
        getUrl({ route: 'movie/top_rated', key: store.state.env.key })
      )
      store.commit('movies/set', res.data.results)
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
  },
}
</script>
