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
		<button @click="drop">drop</button>
	</div>
</template>

<script setup lang="ts">

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
			console.log('correct?', res)
			return res
		})
	},
)

function drop(){
	$fetch('/api/admin/drop',{
		method:"POST",
		body:{
			password:adminPass.value
		},
	})
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
