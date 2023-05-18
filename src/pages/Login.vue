<template>
	<h1>Login</h1>
	<form v-on:submit="e => login(e)"></form>
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

<script lang="ts">
import Cookies from 'js-cookie'
import type { UserData } from '../dataManager.js'

export default {
	data() {
		return {
			userPin: null,
			userData: null,
		}
	},
	created() {
		this.userPIN = Cookies.get('pin')
	},
	methods: {
		async login(e: Event) {
			e.preventDefault()
			const data = await fetch('/login', {
				method: 'POST',
				headers: [['Content-Type', 'application/json']],
				body: JSON.stringify({
					pin: this.userPin,
				}),
			})
			const json: { data: UserData; found: boolean } =
				await data.json()
			if (json.found) {
				alert('login successful. Welcome ' + json.data[1])
				this.userData = json.data
				this.$router.push('/myAcct')
			} else {
				alert('invalid pin')
			}
		},
	},
}
</script>

<style scoped></style>
