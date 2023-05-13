<template>
  <div v-if="isLoggedIn" class="container">

    <h1>Hello, {{ userInfo[1] }}</h1>
    <button @click="requestPinChange">change pin</button>

    <br>
    user Info:{{ userInfo }}
    <br>
    <label for="changeTitle">change title</label>
    <input type="text" id="changeTitle" v-model="userInfo[2]" />

  </div>
  <div class="container" v-else>

    <h2>You need to <router-link to="/login">login</router-link> to have an account page, silly</h2>
  </div>

  <PinSelector :pin="pin" :show-lightbox="showLightBox" @submit="handleLightboxSubmit" @cancel="handleLightboxCancel" />
</template>

<script lang ="ts">
import cookie from 'js-cookie'
import PinSelector from '../components/PinSelector.vue'
import type { UserData } from '../dataManager.js'

export default {
  name: "my account",
  components: {
    PinSelector
  },
  data() {
    return {
      isLoggedIn: false,
      pin: 0,
      userInfo: null,
      showLightBox: false
    }
  },
  methods: {
    requestPinChange() {
      this.showLightBox = true
    },
    handleLightboxSubmit(e) {
      this.showLightBox = false
      console.log(e)
    },
    handleLightboxCancel() {
      this.showLightBox = false
      console.log("cancelled")
    },
    async sendPinChange() {
      fetch('/setUser', {
        method: 'POST',
        headers: [
          ['Content-Type', 'application/json'],
        ],
        body: JSON.stringify({
          
        })
      })
    }
  },
  async created() {
    this.pin = cookie.get("pin")
    if (this.pin != undefined) {
      const fetched: { data: UserData, found: boolean } = (await fetch('/getUser', {
        method: 'POST',
        headers: [
          ['Content-Type', 'application/json'],
        ],
        body: JSON.stringify({
          pin: parseInt(this.pin)
        })
      }).then(res => res.json()))

      this.userInfo = fetched.data
      this.isLoggedIn = fetched.found
    } else {
      this.isLoggedIn = false
    }
  }
}

</script>