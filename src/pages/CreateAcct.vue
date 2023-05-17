<template>
  <h1>Account Creation</h1>

  <form type="POST" v-on:submit="e=>submitForm(e)">
    <label for="name">Name (preferably your real one)</label><br>
    <input type="text" name="name" v-model="name" required /><br>
    
    <label for="title">Title (your job on the team)</label><br>
    <input type="text" name="title" v-model="title" required /><br>
    
    <label for="pin">pin</label><br>
    <input type="number" name="pin" min="0" max ="9999" v-model="pin" required /><br>

    <label for="pin2">retype pin</label><br>
    <input type="number" name="pin2" min="0" max ="9999" v-model="pin2" required /><br>

    <input type="submit" value="submit">
  </form>

  <p>Already have an account? <router-link to="/login">login</router-link></p>
</template>


<script lang="ts">
import Cookies from 'js-cookie'

export default {
  name: 'CreateAcct',
  data(){
    return{
      name:"",
      title:"",
      pin:0,
      pin2:0,
    }
  },
  methods:{
    async submitForm(e:Event){
      e.preventDefault()
      if(this.pin != this.pin2){
        alert('pin does not match')
        return;
      }
      fetch('/create',{
        method: 'POST',
        headers:[
          ['Content-Type', 'application/json'],
        ],
        body: JSON.stringify({
          name: this.name,
          title: this.title,
          pin: this.pin,
        }),
      }).then(async res=>{
        alert(res.ok?
        "account created" :
        await res.text())

        if(res.ok){
          Cookies.set('pin', this.pin.toString())
          this.$router.push('/login')
        }
      })
    }
  },
  
}
</script>

<style scoped>



</style>