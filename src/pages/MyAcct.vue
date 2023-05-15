<template>
  <div v-if="isLoggedIn" class="container">

    <h1>Hello, {{ userInfo[1] }}</h1>
    <h4>{{ userInfo[2] }}</h4>


    <button @click="requestPinChange">change pin</button>


    <div class="changeSomething">
      <label for="changeTitle">Change Name</label>
      <input type="text" id="changeTitle" v-model="newName" :placeholder="userInfo[1]" />
      <button>change</button>
    </div>
    <div class="changeSomething">
      <label for="changeTitle">Change Title</label>
      <input type="text" id="changeTitle" v-model="newTitle" :placeholder="userInfo[2]" />
      <button>change</button>
    </div>

  </div>
  <div class="container" v-else>

    <h2>You need to <router-link to="/login">login</router-link> to have an account page, silly</h2>
  </div>

  <h3>Top 5 times</h3><br>
  <div class="times">
    <div class="time" v-for="time in topTimes">

      <h3>{{ time[0] }}</h3>

      <h5>{{ time[1] }}</h5>
      
    </div>
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
      newName: "",
      newTitle: "",
      isLoggedIn: false,
      userInfo: <UserData>null,
      showLightBox: false
    }
  },
  computed: {
    pin() {
      return parseInt(Cookies.get("pin"))
    },
    topTimes() {
      return (<UserData>this.userInfo)[3]
        .map(time=>[...time,time[1]-time[0]])
        .sort((a,b)=>b[2]-a[2])
        .slice(0,5)
        .map(time=>[
          new Date(time[0]).toLocaleDateString(),
          `total time: ${(time[2]/(1000*60*60)).toFixed(2)} hours`
        ])
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
    async changeName(){
      fetch('/changeName', {
        method: 'POST',
        headers: [
          ['Content-Type', 'application/json'],
        ],
        body: JSON.stringify({
          
        })
      })
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

.times {
 display:flex; 
 flex-direction:column;
 flex-wrap: wrap;
}
</style>