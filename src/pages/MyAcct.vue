<template>
  your account

  <div v-if="isLoggedIn">
    <h1>pin: {{ pin }}</h1>
    user Info:{{ userInfo }}
  </div>
  <div v-else>
    <h1>you are not logged in</h1>
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