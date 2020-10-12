<template>
  <div>
    <ul>
      <li v-for="person in people" :key="person.id">
        <div v-if="person.profile_path" :bind="person">
          <Person />
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { mapState, mapActions } from 'vuex'
import { getImageUrl } from '../utils/getImageUrl'
import Person from '~/components/Person.vue'

export default {
  components: {
    Person,
  },
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
    ...mapActions(['people/set']),
  },
}
</script>
