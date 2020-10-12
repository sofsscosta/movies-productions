<template>
  <div>
    <Search />
    <AppNav />
    <Nuxt />
  </div>
</template>
<script>
import AppNav from '~/components/AppNav'
import Search from '~/components/Search'

export default {
  components: {
    AppNav,
    Search,
  },
}
</script>
