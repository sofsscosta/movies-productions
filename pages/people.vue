<template>
  <div>
    <ul>
      <li v-for="person in people" :key="person.id">
        <p>{{ person.name }}</p>
        <img :src="getImageUrl(person.profile_path)" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { mapState, mapGetters, mapActions } from 'vuex'
import { getImageUrl } from '../utils/getImageUrl'

export default {
  async fetch({ store, $config }: any) {
    console.log('$config', $config)
    if (store.state.people.people.length) return store.state.people.people
    const key = $config.key
    return await store.dispatch('people/init', key)
  },

  computed: {
    ...mapState({
      people: (state: any) => {
        return state.people.people
      },
      error: (state: any) => {
        return state.people.error
      },
    }),
  },

  methods: {
    getImageUrl,
    ...mapGetters(['people/getPopularPeople']),
    ...mapActions(['people/init']),
  },
}
</script>
