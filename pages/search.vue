<template>
  <div>
    <ul>
      <li v-for="movie in searchedMovies" :key="movie.id">
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
      </li>
    </ul>
    <ul>
      <li v-for="person in searchedPeople" :key="person.id">
        <div v-if="person.profile_path" :bind="person">
          <p>{{ person.name }}</p>
          <a
            :bind="person"
            target="_blank"
            :href="'https://image.tmdb.org/t/p/w500/' + person.profile_path"
          >
            <img :src="getImageUrl(person.profile_path)" />
          </a>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { mapState } from 'vuex'
import { getImageUrl } from '../utils/getImageUrl'

export default {
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
