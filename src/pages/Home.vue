<template>
  <h1>welcome to the home page</h1>
  <router-link to="/createAcct">create an account</router-link>
  <div class = "user" v-for="i in data">
    
      <h1>{{i.name}}</h1>
      <p>{{ i.title }}</p>
      <p>total time: {{ i.sumTimeString }}</p>
      <p>{{i }}</p>
    
  </div>
</template>



<script lang="ts">
import {User, UserData} from '../dataManager.js'
export default {
  name: 'Home',
  data() {
    return {
      data: null  
    }
  },
  created() {
    // watch the params of the route to fetch the data again
    this.$watch(
      () => this.$route.params,
      () => {
        this.fetchData()
      },
      // fetch the data when the view is created and the data is
      // already being observed
      { immediate: true }
    )
  },
  methods:{
    async fetchData (){
      // this.data = await(await fetch('/data',{
      //   method: 'GET',
      // })).json()
      this.data = [
        ["0","jo","team captain",[[0,1001],[2000,3000],[0,121000]]],
        ["1","mi hael","driver",[]]
      
      ].map(el=> new User(...<UserData>el)).sort((a:User,b:User)=>b.sumTime- a.sumTime)
    }
  }
}
</script>

<style>
.user{
  border:2px dashed black
}

</style>