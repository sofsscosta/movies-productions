<template>
  <div class="mt-5 mr-5 ml-5 mb-5 p-5 shadow border rounded sm:w-full md:w-64">
    <div class="h-20 flex">
      <p class="font-thin text-lg flex self-center text-center m-auto">
        {{ title }}
      </p>
    </div>
    <a :href="'https://image.tmdb.org/t/p/w500/' + link" target="_blank">
      <img :src="getImageUrl(image)" class="sm:w-full md:w-56 m-auto" />
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
