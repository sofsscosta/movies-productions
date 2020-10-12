<template>
  <div>
    <p
      class="w-40 h-20 text-center font-thin text-lg m-auto justify-self-center"
    >
      {{ title }}
    </p>
    <a :href="'https://image.tmdb.org/t/p/w500/' + link" target="_blank">
      <img
        :src="getImageUrl(image)"
        class="sm:w-30 md:w-40 lg:w-32 xl:w-56 m-auto"
      />
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
