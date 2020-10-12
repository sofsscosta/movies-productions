<template>
  <div>
    <ul>
      <li v-for="person in people" :key="person.id">
        <div v-if="person.profile_path" :bind="person">
          <p>{{ person.name }}</p>
          <a :bind="person" href="person.backdrop_path">
            <img :src="getImageUrl(person.profile_path)" />
          </a>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { mapState, mapGetters, mapActions } from 'vuex'
import { getImageUrl } from '../utils/getImageUrl'

export default {
  async fetch({ store }: any) {
    if (store.state.people.people.length) return store.state.people.people
    return await store.dispatch('people/set', store.state.env.key)
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
    ...mapActions(['people/get']),
  },
}
</script>
