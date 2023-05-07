<template>
  <h1>account creation</h1>

  <form type="POST">
    <label for="name">name (preferably your real one)</label><br>
    <input type="text" name="name" v-model="name" required /><br>
    
    <label for="title">title (your job on the team)</label><br>
    <input type="text" name="title" v-model="title" required /><br>
    
    <label for="pin">pin</label><br>
    <input type="number" name="pin" min="0" max ="9999" v-model="pin" required /><br>

    <label for="pin2">retype pin</label><br>
    <input type="number" name="pin2" min="0" max ="9999" v-model="pin2" required /><br>

    <input type="submit" value="submit">
  </form>
</template>


<script lang="ts">
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
  mounted(){
    this.initializeForm()
  },
  methods:{
    async submitForm(e:Event){
     
      e.preventDefault()
      let data = new FormData(e.target as HTMLFormElement)
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
  },
  
}
</script>

<style scoped>

  form{
    background-color: rgb(181, 115, 211);
    padding: 2rem;
  }

</style>