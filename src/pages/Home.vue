<template>
  <div class="container">
    <h1>Rankings:</h1>
  
    <div class="user" v-for="[i, v] in data.entries()">
      <div class="rank">
        {{ i + 1 }}
      </div>
      <div class="data">
        <h3>{{ v.name }}</h3>
        <p>{{ v.title }}</p>
        <p>total time: {{ v.sumTimeString }}</p>
        <p>total time ms: {{ v.sumTime }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { User, UserData, exampleData, PrivateUser, privateUserData } from '../dataManager.js'
export default {
  name: 'Home',
  data() {
    return {
      data: null
    }
  },
  created() {
    // watch the params of the route to fetch the data again
    this.data = exampleData
        .map(el => new PrivateUser(...<privateUserData>el))
        .sort((a, b) => b.sumTime - a.sumTime)
  }
}
</script>

<style scoped>
h1 {
  font-family: 'Fira Sans', sans-serif;
}

.container {
  background-color: rgb(216, 192, 231);
}

.user {
  background-color: rgb(216, 157, 206); /* Set the light purple background */
  display: flex;
  flex-direction: row;
  font-family: 'Fira Sans', sans-serif;
  margin-bottom: 1rem; /* Increase the space between each box */
}

.user .rank {
  background-color: rgb(92, 37, 180); /* Set the darker purple background */
  color: white;
  padding: 1rem;
  margin-right: 1rem; /* Increase the space between rank and data */
}

.user .data {
  margin: 0.2rem;
}

.data h3,
.data p {
  margin: 0;
}
</style>
