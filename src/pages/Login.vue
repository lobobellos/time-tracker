<template>
  <input type="number" v-model="userPin"><br>
  <button v-on:click="login">login</button>
</template>


<script lang ="ts">
import Cookies from 'js-cookie';
import type { UserData } from '../dataManager.js';

export default{
  data(){
    return{
      userPin:null,
      userData:null
    }
  },
  created(){
    this.userPIN = Cookies.get("pin")


  },
  methods:{
    async login(){
      console.log(this.userPin)
      const data = await fetch('/login',{
        method: 'POST',
        headers:[
          ['Content-Type', 'application/json'],
        ],
        body: JSON.stringify({
          pin: this.userPin
        })
      })

      let json:{data:UserData,found:boolean} = await data.json()
      if(json.found){
        alert("login successful. Welcome " + json.data[1])
        this.userData = json.data
      }
    }
  }
}
</script>