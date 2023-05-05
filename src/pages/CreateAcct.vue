<template>
  <h1>account creation</h1>

  <form type="POST" >
    <label for="name">name</label><br>
    <input type="text" name="name"/><br>

    <label for="pin">pin</label><br>
    <input type="number" name="pin"/><br>
  </form>
</template>


<script lang="ts">

export default {
  name: 'CreateAcct',
  data(){
    return{
      
    }
  },
  
}
</script>