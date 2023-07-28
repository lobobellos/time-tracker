<template>
	<div v-if="isLoggedIn" class="container">
		<h1>Hello, {{ userInfo[1] }}</h1>
		<h4>{{ userInfo[2] }}</h4>
		<button @click="requestPinChange" id="changePin">
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
	<div class="container" v-else>
		<h2>
			You need to
			<router-link to="/login">login</router-link>
			to have an account page, silly
		</h2>
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
		:pin="pin"
		:show-lightbox="showLightBox"
		@data="handleLightboxSubmit"
		@cancel="handleLightboxCancel"
	/>
</template>

<script setup lang="ts">
import Cookies from 'js-cookie'
import PinSelector from '../components/PinSelector.vue'
import type { PinData } from '../components/PinSelector.vue.js'

const err = () => {
	throw new Error()
}

const newName = ref('')
const newTitle = ref('')
const isLoggedIn = ref(false)
const userInfo = ref<UserData >([0,"","",[]])
const showLightBox = ref(false)
const numTimesShown = ref(15)
const pin = ref(parseInt(Cookies.get('pin') ?? err()))

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

function requestPinChange() {
	showLightBox.value = true
}

async function handleLightboxSubmit(e: PinData) {
	showLightBox.value = false
	if (e.currPin == e.newPin) {
		alert('Pin cannot be the same')
	} else if (e.currPin != pin.value) {
		alert('current pin incorrect')
	} else {
		const res = await fetch('/changePin', {
			method: 'POST',
			body: JSON.stringify({
				pin: pin.value,
				newPin: e.newPin,
			}),
		})
		if (res.ok) {
			Cookies.set('pin', e.newPin.toString())
			getUserInfo()
		} else {
			alert('something went wrong' + (await res.text()))
		}
	}
}

function handleLightboxCancel() {
	showLightBox.value = false
	console.log('cancelled')
}
async function changeName() {
	fetch('/changeName', {
		method: 'POST',
		body: JSON.stringify(<changeNameInfo>{
			pin: pin.value,
			newName: newName.value,
		}),
	}).then(async res => {
		alert(
			res.ok
				? 'name changed successfully'
				: await res.text(),
		)
		getUserInfo()
	})
	clearInputs()
}
async function changeTitle() {
	fetch('/changeTitle', {
		method: 'POST',
		headers: [['Content-Type', 'application/json']],
		body: JSON.stringify(<changeTitleInfo>{
			pin: pin.value,
			newTitle: newTitle.value,
		}),
	}).then(async res => {
		alert(
			res.ok
				? 'title changed successfully'
				: await res.text(),
		)
		getUserInfo()
	})
	clearInputs()
}

async function getUserInfo() {
	if (pin.value) {
		const fetched: { data: UserData; found: boolean } =
			await fetch('/getUser', {
				method: 'POST',
				headers: [['Content-Type', 'application/json']],
				body: JSON.stringify({
					pin: pin.value,
				}),
			}).then(res => res.json())

		userInfo.value = fetched.data
		isLoggedIn.value = fetched.found
	} else {
		isLoggedIn.value = false
	}
}

function showAllTimes() {
	numTimesShown.value = Infinity
}

function clearInputs() {
	newName.value = ''
	newTitle.value = ''
}

onMounted(getUserInfo)
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
