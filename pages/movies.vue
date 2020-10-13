<template>
  <div>
    <ul
      class="flex flex-wrap flex-grow justify-center items-center content-center"
    >
      <li v-for="movie in movies" :key="movie.id">
        <div v-if="movie.poster_path" :bind="movie">
          <Result
            :title="movie.title"
            :link="movie.backdrop_path"
            :image="movie.poster_path"
          />
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
import Result from '~/components/Result.vue'

export default {
  components: {
    Result,
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
