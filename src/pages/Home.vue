<template>
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
</template>



<script lang="ts">
import { User, UserData, exampleData } from '../dataManager.js'
export default {
  name: 'Home',
  data() {
    return {
      data: null
    }
  },
  created() {
    // watch the params of the route to fetch the data again
    this.$watch(
      () => this.$route.params,
      () => {
        this.fetchData()
      },
      // fetch the data when the view is created and the data is
      // already being observed
      { immediate: true }
    )
  },
  methods: {
    async fetchData() {
      // this.data = await(await fetch('/data',{
      //   method: 'GET',
      // })).json()
      this.data = exampleData
        .map(el => new User(...<UserData>el))
        .sort((a, b) => b.sumTime - a.sumTime)
    }
  }
}
</script>

<style>
h1 {
  font-family: 'Fira Sans', sans-serif;
}

.user {
  border: 2px dashed black;
  display: flex;
  flex-direction: row;
  font-family: 'Fira Sans', sans-serif;
}

.user .rank {
  margin: 2rem
}

.user .data {
  margin: 0.2rem;
}

.data h3,
.data p {
  margin: 0px;
}
</style>