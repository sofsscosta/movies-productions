<template>
  <nav class="bg-gray-200 flex justify-around items-center h-20 mb-5">
    <nuxt-link to="/movies" class="category" exact>Top Rated Movies</nuxt-link>
    <nuxt-link to="/people" class="category" exact>Popular People</nuxt-link>
  </nav>
</template>

<style lang="postcss" scoped>
.category {
  @apply flex text-center self-center justify-center text-2xl font-thin items-center w-screen h-20;
  &:hover {
    @apply bg-gray-400;
  }
}
</style>
