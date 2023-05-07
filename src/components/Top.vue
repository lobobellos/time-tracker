<template>
  <div class="container">
    <div class="item">
      <router-link to="/">home</router-link>
    </div>
    <div class="item">
      <router-link to="/createAcct">create an account</router-link>
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

router-link{
  font-family: 'Fira Sans', sans-serif;
}

.container{
  display:flex;
  flex-direction: row;
}

.item{
  margin: 0.5rem;
}
</style>