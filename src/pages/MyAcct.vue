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
import type { UserData } from '../dataManager.js'

export default {
  name:"my account",
  data(){
    return {
      isLoggedIn : false,
      pin: null,
      userInfo:null,
    }
  },
  async created(){
    this.pin = cookie.get("pin")
    if(this.pin != undefined){
      const fetched :{data:UserData,found:boolean} = (await fetch('/login',{
        method: 'POST',
        headers:[
          ['Content-Type', 'application/json'],
        ],
        body: JSON.stringify({
          pin: parseInt(this.pin)
        })
      }).then(res=>res.json()))

      this.userInfo = fetched.data
      this.isLoggedIn = fetched.found
    }else{
      this.isLoggedIn = false
    }
  }
}

</script>