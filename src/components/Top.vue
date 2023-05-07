<template>
  <div class="container">
    <div class="item">
      <router-link to="/">Home</router-link>
    </div>
    <div class="item">
      <router-link to="/createAcct">Create an account</router-link>
    </div>
    <div class="item">
      <router-link to="/lookByDay">Specific day data</router-link>
    </div>
  </div>
</template>


<script lang="ts">

export default {
  name:"top",
  data(){
    return{
      width: window.innerWidth
    }
  }
}
</script>

<style scoped>

.container{
  display:flex;
  flex-direction: row;
}

.item{
  margin: 0.5rem;
  font-family: 'Fira Sans', sans-serif;
}
</style>