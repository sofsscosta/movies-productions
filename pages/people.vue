<template>
  <ul
    class="flex flex-wrap flex-grow justify-center items-center content-center"
  >
    <li v-for="person in people" :key="person.id">
      <div v-if="person.profile_path" :bind="person">
        <Result
          :title="person.name"
          :link="person.profile_path"
          :image="person.profile_path"
        />
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { mapState } from 'vuex'
import { getImageUrl } from '../utils/getImageUrl'
import Result from '~/components/Result.vue'
import Person from '~/models/Person'

export default {
  components: {
    Result,
  },

  fetch({ store }) {
    if (store.state.people.popular.length) return store.state.people.popular
    return store.dispatch('people/GET', store.state.env.key)
  },

  computed: {
    ...mapState({
      people: (state: any): Person[] => {
        return state.people.popular.filter(
          (person: Person) => person.profile_path
        )
      },
    }),
  },

  methods: {
    getImageUrl,
  },
}
</script>
