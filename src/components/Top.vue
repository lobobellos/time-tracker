<template>
  <div class="containerSpread" v-if="width > 600">
    <router-link to="/">
      <img src="../assets/teamLogo.png" alt="team logo" id="logo">
    </router-link>
    <router-link to="/lookByDay">Specific data</router-link>
    <router-link v-if="!isLoggedIn" to="/createAcct">Create Account</router-link>
    <router-link v-if="!isLoggedIn" to="/login">Log in</router-link>
    <router-link v-else to="/myAcct">My Account</router-link>
  </div>
  <div class="withDropdown" v-else>
    <div class="container">
      <router-link to="/">
        <img src="../assets/teamLogo.png" alt="logo" id="logo">
      </router-link>
      <div class="threeLineContainer">
        <img src="../assets/threeLines.svg" alt="pages" id="threeLines"
          :style="{ transform: `rotate(${dropdown.rotation}deg)` }" 
          @click="dropdownToggle" >
      </div>
    </div>
    <div class="dropdown" v-if="dropdown.isOpen">
      <router-link to="/lookByDay">Specific data</router-link>
      <router-link v-if="!isLoggedIn" to="/createAcct">Create Account</router-link>
      <router-link v-if="!isLoggedIn" to="/login">Log in</router-link>
      <router-link v-else to="/myAcct">My Account</router-link>
    </div>
  </div>
</template>


<script lang="ts">
import Cookies from 'js-cookie'

export default {
  name: "top",
  created() {
    window.onresize = () => {
      this.width = window.innerWidth
    }
  },
  data() {
    return {
      width: window.innerWidth,
      isLoggedIn: Cookies.get('pin') != undefined,
      dropdown: {
        isOpen: false,
        rotation: 0,
      },
    }
  },
  methods: {
    dropdownToggle() {
      this.dropdown.isOpen = !this.dropdown.isOpen
      this.rotateImage()
    },
    rotateImage() {
      this.dropdown.rotation = this.dropdown.rotation == 0 ? -90 : 0
    }
  },
}
</script>

<style scoped>
.containerSpread , .container {
  display: flex;
  flex-direction: row;
  background-color: rgb(165, 109, 218);
}

.containerSpread a {
  margin-left:0.4rem;
  margin-right:0.4rem;
}

.dropdown {
  background-color: rgb(165, 109, 218);
  padding: 0.5rem;
}

#logo {
  align-self: left;
  width: 50px;
}

.threeLineContainer {
  display:flex;
  margin-left: auto;
  margin-right: 1rem;
  align-items: center;
}

#threeLines {

  width: 50px;
  height:50px;
  transition: transform 100ms ease-in-out;
  clip: rect(0,50,0,50);
}

a {
  margin-bottom: 0.5rem;
  font-family: 'Fira Sans', sans-serif;
  font-size: 1.5rem;
  font-weight: 400;
  display: flex;
  align-items: flex-end;
  text-align: bottom;
  text-decoration: none;
  color: rgb(255, 255, 255);
}
</style>