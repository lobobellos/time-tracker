<template>
	<h2>Admin</h2>
	<label for="adminPass">admin password</label>
	<br />
	<input
		name="adminPass"
		type="password"
		v-model="adminPass"
		@input="checkPass"
	/>

	<div v-if="correctPass">
		<textarea name="" id="" v-model="textArea"></textarea>
		<button @click="publishData">submit new data</button>
	</div>
</template>

<script lang="ts">
import beautify from 'json-beautify'

export default {
	data() {
		return {
			adminPass: '',
			correctPass: false,
			textArea: '',
		}
	},
	computed: {
		prettyJson() {
			return beautify(this.data, null, 2, 1e2)
		},
	},
	methods: {
		async checkPass() {
			this.correctPass = this.correctPass
				? true
				: await fetch('/isAdminPassword', {
						method: 'POST',
						headers: [['Content-Type', 'application/json']],
						body: JSON.stringify({
							password: this.adminPass,
						}),
				  }).then(res => res.json())
			if (this.correctPass) {
				this.getAllData()
			}
		},
		async getAllData() {
			await fetch('/fullData', {
				method: 'GET',
				headers: [['admin-password', this.adminPass]],
			}).then(async res => {
				if (res.ok) {
					this.data = await res.json()
					this.textArea = beautify(this.data, null, 2, 1e2)
				} else {
					alert(await res.text())
				}
			})
		},
		async publishData() {
			try {
				JSON.parse(this.textArea)
			} catch (err) {
				alert('invalid json')
				return
			}
			if (
				prompt(
					"are you sure? type 'yes' to confirm",
				).toLowerCase() == 'yes'
			) {
				await fetch('/publishData', {
					method: 'POST',
					headers: [
						['Content-Type', 'application/json'],
						['admin-password', this.adminPass],
					],
					body: JSON.stringify({
						data: JSON.parse(this.textArea),
					}),
				}).then(async res => {
					if (res.ok) {
						alert('data published')
					} else {
						alert('Error' + (await res.text()))
					}
				})
			}
		},
	},
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
