<template>
	<h1>Account Creation</h1>
	<form type="POST" v-on:submit="e => submitForm(e)">
		<label for="name">
			Name (preferably your real one)
		</label>
		<br />
		<input
			type="text"
			name="name"
			v-model="name"
			required
		/>
		<br />
		<label for="title">Title (your job on the team)</label>
		<br />
		<input
			type="text"
			name="title"
			v-model="title"
			required
		/>
		<br />
		<label for="pin">pin</label>
		<br />
		<input
			type="number"
			name="pin"
			min="0"
			max="9999"
			v-model="pin"
			required
		/>
		<br />
		<label for="pin2">retype pin</label>
		<br />
		<input
			type="number"
			name="pin2"
			min="0"
			max="9999"
			v-model="pin2"
			required
		/>
		<br />
		<input type="submit" value="submit" />
	</form>
	<p>
		Already have an account?
		<router-link to="/login">login</router-link>
	</p>
</template>

<script setup lang="ts">
const name = ref('')
const title = ref('')
const pin = ref(0)
const pin2 = ref(0)

async function submitForm(e: Event) {
	e.preventDefault()
	if (pin.value != pin2.value) {
		alert('pin does not match')
		return
	}
	$fetch('/api/create', {
		method: 'POST',
		body: {
			pin: Number(pin.value),
			name: name.value,
			title: title.value,
		},
	}).then(res => {
		if (res.ok) {
			alert('account created')
		} else {
			alert('something went wrong: ' + res.message)
		}
	})
}
</script>
