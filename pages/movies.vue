<template>
  <div>
    <ul>
      <li v-if="!searchedMovies.length">
        <div v-for="movie in movies" :key="movie.id">
          <div v-if="movie.poster_path" :bind="movie">
            <p>{{ movie.title }}</p>
            <a
              :bind="movie"
              :href="'https://image.tmdb.org/t/p/w500/' + movie.backdrop_path"
              target="_blank"
            >
              <img :src="getImageUrl(movie.poster_path)" />
            </a>
          </div>
        </div>
      </li>
      <li v-if="searchedMovies.length">
        <div v-for="movie in searchedMovies" :key="movie.id">
          <div v-if="movie.poster_path" :bind="movie">
            <p>{{ movie.title }}</p>
            <a
              :bind="movie"
              :href="'https://image.tmdb.org/t/p/w500/' + movie.backdrop_path"
              target="_blank"
            >
              <img :src="getImageUrl(movie.poster_path)" />
            </a>
          </div>
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

export default {
  async fetch({ store }: any) {
    try {
      if (store.state.movies.movies.length) return store.state.movies.movies
      const res = await axios.get(
        getUrl({ route: 'movie/top_rated', key: store.state.env.API_URL })
      )
      store.commit('movies/set', res.data.results)
    } catch (err) {
      store.commit('movies/error', err)
    }
  },

  computed: {
    ...mapState({
      movies: (state: any) => {
        console.log(state.movies.movies)
        return state.movies.movies
      },
      searchedMovies: (state: any) => {
        console.log('searched', state.movies.searchedMovies)
        return state.movies.searchedMovies
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
