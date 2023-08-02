<template>
	<div v-if="!userInfo">loading...</div>
	<div v-else class="container">
		<h1>Hello, {{ userInfo.name }}</h1>
		<h4>{{ userInfo.title }}</h4>
		<form
			class="changeSomething"
			@submit.prevent="changeName"
		>
			<label for="changeName">Change Name</label>
			<input
				type="text"
				id="changeName"
				v-model="newName"
				:placeholder="userInfo.name"
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
				:placeholder="userInfo.title"
			/>
			<button type="submit">Change</button>
		</form>
	</div>
	<button @click="showLightBox = true" id="changePin">
		Change Pin
	</button>

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
		:show-lightbox="showLightBox"
		@data="handleLightboxSubmit"
		@cancel="handleLightboxCancel"
	/>
</template>

<script setup lang="ts">
import Cookies from 'js-cookie'
import PinSelector from '../components/PinSelector.vue'

if (!getID()) useRouter().push('/login')

const newName = ref('')
const newTitle = ref('')
const showLightBox = ref(false)
const numTimesShown = ref(15)

function getID() {
	return (
		Cookies.get('id') ??
		(() => {
			throw new Error('no id found')
		})()
	)
}

const {
	data: userInfo,
	pending,
	refresh,
} = useAsyncData('userInfo', async () => {
	const { data } = await $fetch('/api/getUser', {
		method: 'POST',
		body: {
			id: getID(),
		},
	})
	if (!getID()) useRouter().push('/login')
	console.log(data)
	//@ts-ignore
	return data
})

function topTimes() {
	return !userInfo.value
		? []
		: userInfo.value.roomTimes
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

async function handleLightboxSubmit(e: { currPin: any; newPin: { toString: () => string; }; }) {
	showLightBox.value = false
	if (e.currPin == e.newPin) {
		alert('Pin cannot be the same')
	} else {
		$fetch('/api/change/pin', {
			method: 'POST',
			body: {
				pin: getID(),
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
			id: getID(),
			newName: newName.value,
		},
	}).then(async res => {
		alert(
			res.ok ? 'name changed successfully' : res.message,
		)
		refresh()
	})
	clearInputs()
}
function changeTitle() {
	$fetch('/api/change/title', {
		method: 'POST',
		body: {
			id: getID(),
			newTitle: newTitle.value,
		},
	}).then(async res => {
		alert(
			res.ok ? 'title changed successfully' : res.message,
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

<style scoped lang="scss">
.container {
	h1 {
		margin-bottom: 0;
	}
	h4 {
		margin-top: 0.25rem;
	}
}
.changeSomething {
	margin-top: 1rem;
	display: flex;
	flex-direction: row;
	label {
		margin-left: 0;
	}
	input {
		background-color: #c3a6df;
		border: 2px solid blueviolet;
		border-radius: 0.3rem;
	}
	input::placeholder {
		color: rgb(85, 85, 85);
	}
	* {
		margin-left: 0.2rem;
		margin-right: 0.2rem;
	}
}
#changePin {
	margin-top: 1rem;
	padding: 0.5rem;
	border-radius: 0.5rem;
}
button {
	margin-top: 0rem;
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
