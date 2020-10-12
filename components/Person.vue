<template>
  <div>
    <p>{{ person.title }}</p>
    <a
      :bind="person"
      :href="'https://image.tmdb.org/t/p/w500/' + person.profile_path"
      target="_blank"
    >
      <img :src="getImageUrl(person.profile_path)" />
    </a>
  </div>
</template>

<script lang="ts">
import { getImageUrl } from '../utils/getImageUrl'

export default {
  props: ['person'],
  methods: {
    getImageUrl,
  },
}
</script>
