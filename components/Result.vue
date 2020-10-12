<template>
  <div>
    <p>{{ title }}</p>
    <a :href="'https://image.tmdb.org/t/p/w500/' + link" target="_blank">
      <img :src="getImageUrl(image)" />
    </a>
  </div>
</template>

<script lang="ts">
import { getImageUrl } from '../utils/getImageUrl'

export default {
  props: ['title', 'link', 'image'],
  methods: {
    getImageUrl,
  },
}
</script>
