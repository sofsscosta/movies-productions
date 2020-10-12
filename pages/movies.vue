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
import Movie from '../models/movie'

const key = process.env.API_KEY

export default {
  async fetch({ store, error }) {
    try {
      if (store.state.movies.movies.length) return store.state.movies.movies
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&page=1`
      )
      store.commit('movies/init', res.data.results)
    } catch (err) {
      error({ statusCode: 500, message: 'Opps, try again' })
    }
  },

  data(movie: Movie) {
    return {
      key,
      image: () => getImageUrl(movie.poster_path),
    }
  },

  computed: {
    ...mapState({
      movies: (state: any) => {
        return state.movies.movies
      },
    }),
  },

  methods: {
    getImageUrl,
    ...mapGetters(['movies/getTopRatedMovies']),
  },
}
</script>
