<template>
	<div class="container">
		<h1>Rankings:</h1>

		<div class="user" v-for="[i, v] in data.entries()" v-if="data.length">
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
		<div v-else>
			<p>no data rn</p>
		</div>
	</div>
</template>

<script lang="ts">
import {
	User,
	UserData,
	exampleData,
	PrivateUser,
	privateUserData,
} from '../dataManager.js'
export default {
	name: 'Home',
	data() {
		return {
			data: <PrivateUser[]>null,
		}
	},
	async created() {
		// watch the params of the route to fetch the data again
		this.data = (<privateUserData[]>await fetch('/data', {
			method: 'GET',
		}).then(res => res.json()))
			.map(el => new PrivateUser(...el))
			.sort((a, b) => b.sumTime - a.sumTime)
	},
	mounted() {},
}
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
