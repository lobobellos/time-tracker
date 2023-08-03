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
const userPin = ref<string | null>(null)

async function login(e: Event) {
	e.preventDefault()
	$fetch('/api/login', {
		method: 'POST',
		body: {
			pin: userPin.value,
		},
	}).then(res => {
		if (res.ok) {
			useRouter().push('/MyAcct')
		} else {
			alert('something went wrong: ' + res.message)
		}
	})
}
</script>
