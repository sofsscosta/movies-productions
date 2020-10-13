<template>
  <div class="mt-5 mr-5 ml-5 mb-5 p-5 shadow border rounded sm:w-full md:w-64">
    <div class="h-20 flex">
      <p class="font-thin text-lg flex self-center text-center m-auto">
        {{ title }}
      </p>
    </div>
    <a :href="getImageUrl(image)" target="_blank">
      <img :src="getImageUrl(image)" class="sm:w-full md:w-56 m-auto" />
    </a>
  </div>
</template>

<script lang="ts">
import { PropOptions } from 'vue'

const getImageUrl = (image: string) => {
  return `https://image.tmdb.org/t/p/w500${image}`
}

export default {
  props: {
    title: {
      type: String,
      required: true,
    } as PropOptions<string>,
    link: {
      type: String,
      required: true,
    } as PropOptions<string>,
    image: {
      type: String,
      required: true,
    } as PropOptions<string>,
  },
  methods: {
    getImageUrl,
  },
}
</script>
