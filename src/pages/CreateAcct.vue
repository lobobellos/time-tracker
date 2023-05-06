<template>
  <h1>account creation</h1>

  <form type="POST" >
    <label for="name">name (preferably your real one)</label><br>
    <input type="text" name="name" required/><br>
    
    <label for="title">title (your job on the team)</label><br>
    <input type="text" name="title"/><br>
    
    <label for="pin">pin</label><br>
    <input type="number" name="pin" min="0" max ="9999"/><br>

    <label for="pin2">retype pin</label><br>
    <input type="number" name="pin2" min="0" max ="9999"/><br>

    <input type="submit" value="submit">
  </form>
</template>


<script lang="ts">
let form: HTMLFormElement;
window.onload = ()=>{
  form = document.forms[0]
  form.onsubmit = async e=>{
    e.preventDefault()
    let data = new FormData(form)
    if(data.get('pin') != data.get('pin2')){
      alert('pin does not match')
      return;
    }
    fetch('/create',{
      method: 'POST',
      headers:[
        ['Content-Type', 'application/json'],
      ],
      body: JSON.stringify({
        name: data.get('name'),
        title: data.get('title'),
        pin: data.get('pin'),
      }),
      
    }).then(async res=>{
      alert(res.ok?
      "account created" :
      await res.text())
    })
  }
}

export default {
  name: 'CreateAcct',
  data(){
    return{
      
    }
  },
  
}
</script>

<style scoped>

  form{
    background-color: rgb(181, 115, 211);
    padding: 2rem;
  }

</style>