<template>
	<h2>Admin</h2>
	<label for="adminPass">admin password</label>
	<br />
	<form @submit.prevent="e => correctPass.refresh()">
		<input
			name="adminPass"
			type="password"
			v-model="adminPass"
		/>
		<button>check</button>
	</form>
	<div v-if="correctPass.data.value">
		<textarea name="" id="" v-model="textArea"></textarea>
		<button @click="publishData">submit new data</button>
	</div>
</template>

<script setup lang="ts">
import beautify from 'json-beautify'

const adminPass = ref('')
const textArea = ref('')

const correctPass = useAsyncData(
	'isPassCorrect',
	async () => {
		return await $fetch('/api/admin/checkPass', {
			method: 'POST',
			body: {
				password: adminPass.value,
			},
		}).then(async res => {
			if (res) fullData.refresh()
			console.log('correct?', res)
			return res
		})
	},
)

const fullData = useAsyncData('fulluserInfo', async () => {
	$fetch('/api/admin/fullData', {
		method: 'GET',
		headers: [['admin-password', adminPass.value]],
	}).then(async res => {
		if (res.ok) {
			alert(res.message)
			textArea.value = beautify(res?.data, [], 2, 1e2)
		}
		console.log('fullData', res)
	})
})

async function publishData() {
	try {
		JSON.parse(textArea.value)
	} catch (err) {
		alert('invalid json')
		return
	}
	if (
		['yes', 'y', 'ye', 'yeah'].includes(
			String(
				prompt(
					"are you sure? type 'yes' to confirm",
				)?.toLowerCase(),
			),
		)
	) {
		await $fetch('/api/admin/setData', {
			method: 'POST',
			body: {
				password: adminPass.value,
				data: JSON.parse(textArea.value),
			},
		}).then(async res => {
			if (res.ok) {
				alert('data published')
			} else {
				alert('Error' + res.message)
			}
		})
	}
}
</script>

<style scoped>
textarea {
	width: calc(100% - 4rem);
	height: 500px;
	margin-top: 1rem;
	margin-left: 2rem;
	margin-right: 2rem;
}
</style>
