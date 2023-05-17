<template>
  <h2>Admin</h2>
  <label for="adminPass">admin password</label><br>
  <input name="adminPass" type="password" v-model="adminPass" @input="checkPass">

  <div v-if="correctPass">
    <textarea name="" id="" >{{ prettyJson }}</textarea>
    <button>sumbit new data</button>
  </div>
</template>


<script lang="ts">
import { exampleData } from '../dataManager.js';
import beautify from 'json-beautify';

const day = 24* 60 *60 * 1000

const data = exampleData;

export default {
  data(){
    return {
      adminPass : "",
      correctPass : false,
      data: [],
    }
  },
  computed: {
    prettyJson() {
      return beautify(this.data, null, 1000);
    },
  },
  mounted(){
    
  },
  methods:{
    async checkPass(){
      this.correctPass = this.correctPass ? true :
      await fetch('/isAdminPassword', {
        method: 'POST',
        headers: [
          ['Content-Type', 'application/json'],
        ],
        body: JSON.stringify({
          password: this.adminPass,
        })
      })
      .then(res=>res.json())
    },
    async getAllData(){
      await fetch('/getAllData', {
        method: 'GET',
        headers: [
          ['Content-Type', 'application/json'],
          ['Accept', 'application/json'],
          ['adminPassword', this.adminPass],
        ],
      })
    }
  }
}
</script>


<style scoped>
textarea{
  width:calc(100% - 4rem);
  height: fit-content;
  margin-top:1rem;
  margin-left: 2rem;
  margin-right: 2rem;
}
</style>
