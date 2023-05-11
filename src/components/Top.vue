<template>
  <div class="container">
    <div class="item">
      <router-link to="/">Home</router-link>
    </div>
    <div class="item">
      <router-link to="/lookByDay">Specific data</router-link>
    </div>
    <div class="item" v-if="!isLoggedIn">
      <router-link to="/createAcct">Create Account</router-link>
    </div>
    <div class="item" v-if="!isLoggedIn">
      <router-link to="/login">Log in</router-link>
    </div>
    <div class="item" v-else>
      <router-link to="/myAcct">My Account</router-link>
    </div>
    

  </div>
</template>


<script lang="ts">
import Cookies from 'js-cookie'

export default {
  name:"top",
  data(){
    return{
      width: window.innerWidth,
      isLoggedIn:Cookies.get('pin') != undefined
    }
  },
  mounted(){
    console.log(this.isLoggedIn)
    this.$root.$on('login',()=>{
      this.isLoggedIn = true
    })
  }
}


</script>

<style scoped>

.container{
  display:flex;
  flex-direction: row;
  background-color: rgb(165, 109, 218);
}

.item{
  margin: 0.5rem;
  font-family: 'Fira Sans', sans-serif;
}

.item *{
  text-decoration: none;
  color: rgb(255, 255, 255);
}
</style>