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

export default {
  components: {
    Result,
  },

  fetch({ store }) {
    if (store.state.people.people.length) return store.state.people.people
    return store.dispatch('people/SET', store.state.env.key)
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
  },
}
</script>
