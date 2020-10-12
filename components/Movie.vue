<template>
  <div>
    <p>{{ movie.title }}</p>
    <a
      :bind="movie"
      :href="'https://image.tmdb.org/t/p/w500/' + movie.backdrop_path"
      target="_blank"
    >
      <img :src="getImageUrl(movie.poster_path)" />
    </a>
  </div>
</template>

<script lang="ts">
import { getImageUrl } from '../utils/getImageUrl'

export default {
  props: ['movie'],
  methods: {
    getImageUrl,
  },
}
</script>
