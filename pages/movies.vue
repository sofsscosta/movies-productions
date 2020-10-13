<template>
  <ul
    class="flex flex-wrap flex-grow justify-center items-center content-center"
  >
    <li v-for="movie in movies" :key="movie.id">
      <div v-if="movie.poster_path && movie.backdrop_path" :bind="movie">
        <Result
          :title="movie.title"
          :link="movie.backdrop_path"
          :image="movie.poster_path"
        />
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { mapState } from 'vuex'
import Result from '~/components/Result.vue'

export default {
  components: {
    Result,
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
}
</script>
