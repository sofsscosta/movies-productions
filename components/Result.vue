<template>
  <div>
    <div class="h-20 flex">
      <p class="font-thin text-lg flex self-center text-center m-auto">
        {{ title }}
      </p>
    </div>
    <a :href="'https://image.tmdb.org/t/p/w500/' + link" target="_blank">
      <img
        :src="getImageUrl(image)"
        class="sm:w-10 md:w-40 lg:w-56 xl:w-56 m-auto"
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
