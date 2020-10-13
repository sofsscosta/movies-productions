<template>
  <div>
    <h1 v-if="!query" :bind="query" class="category">Type your search!</h1>
    <div v-else>
      <h1 class="category">Showing results for {{ query }}</h1>
      <div class="flex flex-row flex-wrap justify-around">
        <div class="flex-column flex-wrap w-2/5 content-start justify-center">
          <h1 class="category">Movies</h1>
          <h1
            v-if="!searchedMovies.length"
            :bind="searchedMovies"
            class="no-result"
          >
            No results
          </h1>
          <div v-else>
            <ul
              class="flex flex-wrap justify-center items-center content-center"
            >
              <li v-for="movie in searchedMovies" :key="movie.id">
                <Result
                  :title="movie.title"
                  :link="movie.backdrop_path"
                  :image="movie.poster_path"
                />
              </li>
            </ul>
          </div>
        </div>
        <div class="flex-column flex-wrap w-2/5 content-start justify-center">
          <h1 class="category">People</h1>
          <h1
            v-if="!searchedPeople.length"
            :bind="searchedPeople"
            class="no-result"
          >
            No results
          </h1>
          <div v-else>
            <ul
              class="flex flex-wrap justify-center items-center content-center"
            >
              <li v-for="person in searchedPeople" :key="person.id">
                <Result
                  :title="person.name"
                  :link="person.profile_path"
                  :image="person.profile_path"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { mapState } from 'vuex'
import Result from '~/components/Result.vue'
import Movie from '~/models/Movie'
import Person from '~/models/Person'

export default {
  components: {
    Result,
  },
  computed: {
    ...mapState({
      searchedPeople: (state: any) => {
        return state.people.searchedPeople.filter(
          (person: Person) => person.profile_path
        )
      },
      searchedMovies: (state: any) => {
        return state.movies.searchedMovies.filter(
          (movie: Movie) => movie.poster_path && movie.backdrop_path
        )
      },
      query: (state: any) => {
        return state.query
      },
    }),
  },
}
</script>

<style lang="postcss" scoped>
.category {
  @apply flex text-center self-center justify-center text-2xl font-thin items-center;
}
.no-result {
  @apply flex text-center self-center justify-center text-lg font-thin items-center pt-10;
}
</style>
