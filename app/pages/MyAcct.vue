<template>
	<div v-if="!userInfo">loading...</div>
	<div v-else class="container">
		<h1>Hello, {{ userInfo[1] }}</h1>
		<h4>{{ userInfo[2] }}</h4>
		<button @click="showLightBox = true" id="changePin">
			Change Pin
		</button>
		<form
			class="changeSomething"
			@submit.prevent="changeName"
		>
			<label for="changeTitle">Change Name</label>
			<input
				type="text"
				id="changeTitle"
				v-model="newName"
				:placeholder="userInfo[1]"
			/>
			<button type="submit">Change</button>
		</form>
		<form
			class="changeSomething"
			@submit.prevent="changeTitle"
		>
			<label for="changeTitle">Change Title</label>
			<input
				type="text"
				id="changeTitle"
				v-model="newTitle"
				:placeholder="userInfo[2]"
			/>
			<button type="submit">Change</button>
		</form>
	</div>

	<h3>Top Times</h3>
	<br />
	<div class="times">
		<div class="time" v-for="time in topTimes">
			<h3>{{ time[0] }}</h3>
			<h5>{{ time[1] }}</h5>
		</div>
	</div>
	<button @click="showAllTimes">Show All</button>

	<PinSelector
		:pin="getPin()"
		:show-lightbox="showLightBox"
		@data="handleLightboxSubmit"
		@cancel="handleLightboxCancel"
	/>
</template>

<script setup lang="ts">
import Cookies from 'js-cookie'
import PinSelector from '../components/PinSelector.vue'
import type { PinData } from '../components/PinSelector.vue.js'

if (!getPin()) useRouter().push('/login')

const newName = ref('')
const newTitle = ref('')
const showLightBox = ref(false)
const numTimesShown = ref(15)

function getPin() {
	return Number(Cookies.get('pin') ?? (()=>{throw new Error('something went wrong')})())
}

const {
	data: userInfo,
	pending,
	refresh,
} = useAsyncData('userInfo', async () => {
	const { data } = await $fetch('/api/getUser', {
		method: 'POST',
		body: {
			pin: getPin(),
		},
	})
	if (!getPin()) useRouter().push('/login')
	console.log(data)
	return data
})

function topTimes() {
	return !userInfo.value
		? []
		: userInfo.value[3]
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

async function handleLightboxSubmit(e: PinData) {
	showLightBox.value = false
	if (e.currPin == e.newPin) {
		alert('Pin cannot be the same')
	} else if (e.currPin != getPin()) {
		alert('current pin incorrect')
	} else {
		$fetch('/api/change/pin', {
			method: 'POST',
			body: {
				pin: getPin(),
				newPin: e.newPin,
			},
		}).then(res => {
			if (res.ok) {
				Cookies.set('pin', e.newPin.toString())
				refresh()
			} else {
				alert('something went wrong' + res.message)
			}
		})
	}
}

function handleLightboxCancel() {
	showLightBox.value = false
	console.log('cancelled')
}

async function changeName() {
	$fetch('/api/change/name', {
		method: 'POST',
		body: {
			pin: getPin(),
			newName: newName.value,
		},
	}).then(async res => {
		alert(
			res.ok
				? 'name changed successfully'
				: res.message
		)
		refresh()
	})
	clearInputs()
}
function changeTitle() {
	$fetch('/api/change/title', {
		method: 'POST',
		body: {
			pin: getPin(),
			newTitle: newTitle.value,
		},
	}).then(async res => {
		alert(
			res.ok
				? 'title changed successfully'
				: res.message,
		)
		refresh()
	})
	clearInputs()
}

function showAllTimes() {
	numTimesShown.value = Infinity
}

function clearInputs() {
	newName.value = ''
	newTitle.value = ''
}
</script>

<style scoped>
.container h1 {
	margin-bottom: 0;
}

.container h4 {
	margin-top: 0.25rem;
}

.changeSomething {
	margin-top: 1rem;
	display: flex;
	flex-direction: row;
}

.changeSomething * {
	margin-left: 0.2rem;
	margin-right: 0.2rem;
}

#changePin {
	padding: 0.5rem;
	border-radius: 0.5rem;
}

button {
	font-family: 'Fira sans';
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
}

button:hover {
	background-position: 0 -100%; /* Move gradient upwards */
}

.changeSomething label {
	margin-left: 0;
}

.changeSomething input {
	background-color: #c3a6df;
	border: 2px solid blueviolet;
	border-radius: 0.3rem;
}

.changeSomething input::placeholder {
	color: rgb(85, 85, 85);
}

.times {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
}

.time {
	font-family: 'Fira sans';
	text-align: center;
	color: white;
	background-color: blueviolet;
	margin: 0.5rem;
	padding: 0.5rem;
	border-radius: 1rem;
}
</style>
