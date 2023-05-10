<template>
  your account
  <h1>{{ user }}</h1>
</template>

<script lang ="ts">
import cookie from 'js-cookie'


export default {
  name:"my account",
  data(){
    return {
      user: null,
    }
  },
  created(){
    this.user = cookie.get("user")

    alert(this.user)
  }
}

</script>