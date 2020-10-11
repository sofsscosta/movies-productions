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
import { mapState } from 'vuex'
import axios from 'axios'
import { getImageUrl } from '../utils/getImageUrl'

export default {
  async fetch({ store, error }) {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.API_KEY}&page=1`
      )
      if (res) store.commit('movies/init', res.data.results)
    } catch (err) {
      error({ statusCode: 500, message: 'Opps, try again' })
    }
  },

  data(img: string) {
    return {
      image: getImageUrl(img),
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
  },
}
</script>
