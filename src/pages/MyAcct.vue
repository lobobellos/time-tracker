<template>
  <div v-if="isLoggedIn" class="container">

    <h1>Hello, {{ userInfo[1] }}</h1>
    <button @click="requestPinChange">change pin</button>

    <br>
    user Info:{{ userInfo }}
    <br>
    <div class="changeSomething">
      <label for="changeTitle">Change Name</label>
      <input type="text" id="changeTitle" v-model="userInfo[1]" />
      <button>change</button>
    </div>
    <div class="changeSomething">
      <label for="changeTitle">change title</label>
      <input type="text" id="changeTitle" v-model="userInfo[2]" />
      <button>change</button>
    </div>

  </div>
  <div class="container" v-else>

    <h2>You need to <router-link to="/login">login</router-link> to have an account page, silly</h2>
  </div>

  <PinSelector :pin="pin" :show-lightbox="showLightBox" @data="handleLightboxSubmit" @cancel="handleLightboxCancel" />
</template>

<script lang ="ts">
import Cookies from 'js-cookie'
import PinSelector from '../components/PinSelector.vue'
import type { PinData } from '../components/PinSelector.vue.js'
import type { UserData } from '../dataManager.js'

export default {
  name: "my account",
  components: {
    PinSelector
  },
  data() {
    return {
      isLoggedIn: false,
      userInfo: <UserData>null,
      showLightBox: false
    }
  },
  computed: {
    pin() {
      return parseInt(Cookies.get("pin"))
    }
  },
  methods: {
    requestPinChange() {
      this.showLightBox = true
    },
    async handleLightboxSubmit(e: PinData) {
      this.showLightBox = false
      if (e.currPin == e.newPin) {
        alert("Pin cannot be the same")
      }else if (e.currPin != this.pin){
        alert("current pin incorrect")
      }else{
        fetch('/changePin', {
        method: 'POST',
        headers: [
          ['Content-Type', 'application/json'],
        ],
        body: JSON.stringify({
          pin: this.pin,
          newPin: e.newPin
        })
      })
      .then(async res =>{
        if(res.ok) {
          Cookies.set("pin", e.newPin.toString())
          this.getUserInfo()
        }else{
          alert("something went wrong"+await res.text())
        }
      })
      }
    },
    handleLightboxCancel() {
      this.showLightBox = false
      console.log("cancelled")
    },
    async sendPinChange(newPin: number) {
      
      await this.getUserInfo()
    },
    async getUserInfo() {
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
  },
  async created() {
    await this.getUserInfo()
  }
}

</script>

<style scoped>
.changeSomething {
  margin-top:1rem;
}
</style>