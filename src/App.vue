<script setup lang="ts">
  import Top from './components/Top.vue'
</script>

<template>
  <div class="container">
    <Top/>
    <router-view id="router-view"></router-view>
  </div>
</template>

<style scoped>
#router-view{
  margin-left: 1rem;
  margin-right: 1rem;
}
</style>
