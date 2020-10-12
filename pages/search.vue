<template>
  <div>
    <h1 class="category">Showing Results for: {{ query }}</h1>
    <div class="flex flex-row flex-wrap justify-around">
      <div class="flex-column flex-wrap w-2/5 content-start justify-center">
        <h1 class="category">Movies</h1>
        <ul class="flex flex-wrap justify-center items-center content-center">
          <li v-for="movie in searchedMovies" :key="movie.id">
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
      <div class="flex-column flex-wrap w-2/5 content-start justify-center">
        <h1 class="category">People</h1>
        <ul class="flex flex-wrap justify-center items-center content-center">
          <li v-for="person in searchedPeople" :key="person.id">
            <div v-if="person.profile_path" :bind="person">
              <Result
                :title="person.name"
                :link="person.profile_path"
                :image="person.profile_path"
              />
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { mapState } from 'vuex'
import { getImageUrl } from '../utils/getImageUrl'
import Result from '~/components/Result.vue'

export default {
  components: {
    Result,
  },
  props: ['query'],
  computed: {
    ...mapState({
      searchedPeople: (state: any) => {
        return state.people.searchedPeople
      },
      searchedMovies: (state: any) => {
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

<style lang="postcss" scoped>
.category {
  @apply flex text-center self-center justify-center text-2xl font-thin items-center;
}
</style>
