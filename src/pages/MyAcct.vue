<template>
  <h1>{{ user }}</h1>
</template>

<script lang ="ts">
import cookie from 'js-cookie'


export default {
  data(){
    return {
      user: null,
    }
  },
  onMount(){
    this.user = cookie.get("user")
  }
}

</script>