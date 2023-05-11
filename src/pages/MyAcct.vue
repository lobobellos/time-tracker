<template>
  <div v-if="isLoggedIn" class="container">
  
    <h1>My Account</h1>
    <h3>pin: {{ pin }}</h3>
  
  
    user Info:{{ userInfo }}
  </div>
  <div class="container" v-else>
    
    <h2>You need to <router-link to="/login">login</router-link> to have an account page, silly</h2>
  </div>
</template>

<script lang ="ts">
import cookie from 'js-cookie'

export default {
  name:"my account",
  data(){
    return {
      pin: null,
      userInfo:null,
      isLoggedIn:false
    }
  },
  created(){
    this.isLoggedIn = cookie.get("pin") != undefined

    this.pin =cookie.get("pin")
    this.getData()
  },
  methods:{
    async getData(){

      this.userInfo = (await fetch('/login',{
        method: 'POST',
        headers:[
          ['Content-Type', 'application/json'],
        ],
        body: JSON.stringify({
          pin: this.pin
        })
      }).then(res=>res.json())).data


      console.log(this.userInfo)
    }
  }
}

</script>