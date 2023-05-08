<template>
  <h2>Search for a Day</h2>
  <input type="date" name="date" id="lookDate" v-model="stringData" v-on:change="getData">
  <div class="container" v-if="!selected">
    <h3>select something</h3>
  </div>
  <div class="container" v-else>
    <h3>num date:{{ selectedDate }}</h3>
    <h3>string date:{{ new Date(selectedDate+21600000) }}</h3>
    <div class="data" v-if="matchingData.length !=0" v-for="i in matchingData">
      {{ i }}
    </div>
    <div class="data" v-else>
      no data from this day
    </div>
  </div>
  {{ stringData }}
</template>


<script lang="ts">
import { exampleData } from '../dataManager.js';

const day = 24* 60 *60 * 1000

const data = exampleData;

export default {
  data(){
    return {
      selected: false,
      matchingData: null,
      stringData : null,
      selectedDate:null
    }
  },
  mounted(){
    
  },
  methods:{
    getData(e:Event){

      this.selectedDate = (<HTMLInputElement>e.target).valueAsNumber;

      this.matchingData = data
      this.selected = true
    }
  }
}
</script>

