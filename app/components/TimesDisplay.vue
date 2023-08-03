<script lang="ts" setup>
const numTimesShown = ref(15)

function topTimes() {
	return props.times
				.map(time => [...time, time[1] - time[0]])
				.sort((a, b) => b[2] - a[2])
				.slice(0, numTimesShown.value)
				.map(time => [
					new Date(time[0]).toLocaleDateString(),
					`total time: ${(
						time[2] /
						(1000 * 60 * 60)
					).toFixed(2)} hours`,
				])
}

const props = defineProps({
  times:{
    type: Array<number[]>,
    required: true,
  }
})
</script>

<template>
	<br />
	<div class="times">
		<div class="time" v-for="time in topTimes()">
			<h3>{{ time[0] }}</h3>
			<h5>{{ time[1] }}</h5>
		</div>
	</div>
	<button @click="numTimesShown = Infinity">
		Show All
	</button>
</template>

<style scoped lang="scss">
.times {
  font-family: 'Fira sans';
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
}
.time {
	text-align: center;
	color: black;
	background-color: rgb(138, 43, 226);
	margin: 0.5rem;
	padding: 0.5rem;
	border-radius: 1rem;
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.2);
	h3 {
		margin-top: 0;
		margin-bottom: 0.2rem;
	}
	h5 {
		margin: 0;
	}
}
.time:hover {
  box-shadow: 0 0 10px 3px rgba(138, 43, 266, 1);
}
button {
	font-weight: 600;
	background-color: #a56dda;
	border: 0px;
	border-radius: 0.5rem;
	background-image: linear-gradient(
		to top,
		blueviolet 50%,
		#a56dda 50%
	); /* Set gradient to new color */
	background-size: 100% 200%; /* Set size of gradient */
	transition: background-position 0.3s; /* Set transition duration */
	padding: 0.2rem;
}
button:hover {
	background-position: 0 -100%; /* Move gradient upwards */
}
</style>

