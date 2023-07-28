<template>
	<h1>Login</h1>
	<form v-on:submit="login"></form>
	<label for="pin">Pin</label>
	<br />
	<input
		type="number"
		name="pin"
		placeholder="0000"
		v-model="userPin"
	/>
	<br />
	<button v-on:click="login">login</button>

	<p>
		No account?
		<router-link to="/createAcct">create one</router-link>
	</p>
</template>

<script setup lang="ts">
import Cookies from 'js-cookie'

const userPin = ref<string | null>(null)
const userData = ref<UserData | null>(null)

onMounted(() => {
	userPin.value = Cookies.get('pin') ?? null
})

async function login(e: Event) {
	e.preventDefault()
	const {data} =<{ data?: UserData }> await $fetch('/login', {
		method: 'POST',
		body: {
			pin: userPin.value,
		},
	})
}
</script>

<style scoped></style>
