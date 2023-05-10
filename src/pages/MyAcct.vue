<template>
  your account
  <h1>pin: {{ pin }}</h1>


  user Info:{{ userInfo }}
</template>

<script lang ="ts">
import cookie from 'js-cookie'

export default {
  name:"my account",
  data(){
    return {
      pin: null,
      userInfo:null,
    }
  },
  created(){
    this.pin = cookie.get("pin")
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