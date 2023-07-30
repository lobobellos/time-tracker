<template>
	<div class="container">
		<h1>Rankings:</h1>
		<div v-if="!data">
			<p>loading ...</p>
		</div>
		<div v-else-if="data.length == 0">
			<p>no data yet</p>
		</div>
		<div v-else>
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
	</div>
</template>

<script setup lang="ts">
const { data, pending, refresh } = await useAsyncData(
	'data',
	async () => {
		const {ok,message,data} = await $fetch('/api/data')
		if(ok) return data
		alert( message)
		throw message
	},
)
</script>

<style scoped>
h1 {
	font-weight: bold;
}

.container {
	background-color: rgb(216, 192, 231);
}

.user {
	background-color: rgb(
		216,
		157,
		206
	); /* Set the light purple background */
	display: flex;
	flex-direction: row;
	font-family: 'Fira Sans', sans-serif;
	margin-bottom: 1rem; /* Increase the space between each box */
}

.user .rank {
	background-color: rgb(
		92,
		37,
		180
	); /* Set the darker purple background */
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
