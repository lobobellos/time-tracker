<template>
  <h2>Admin</h2>
  <label for="adminPass">admin password</label><br>
  <input name="adminPass" type="password" v-model="adminPass">

  <div v-if="adminPass != ''">
    <textarea name="" id="" ></textarea>
    <button>sumbit new data</button>
  </div>
</template>


<script lang="ts">
import { exampleData } from '../dataManager.js';

const day = 24* 60 *60 * 1000

const data = exampleData;

export default {
  data(){
    return {
      adminPass : "",
    }
  },
  mounted(){
    
  },
  methods:{
    
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
