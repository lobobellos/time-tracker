<script setup lang="ts">
const route = useRoute()

const name = decodeURIComponent(route.query.name as string) 

if(!name) {
    useRouter().push('/')
}


const { data: user } = useAsyncData(
	'userInfo',
	async () => {
		const  res = await $fetch(`/api/getUserByName`,{
      method: 'POST',
      body: {
        name
      }
    })
		if (!res.ok) alert('something went wrong: ' + res?.message)
		return res.data
	},
)
</script>

<template>
  <div v-if="!user">loading...</div>
	<div v-else class="container">
		<h1>{{ user.name }}</h1>
		<h4>{{ user.title }}</h4>
    <textarea name="" id="" rows="5" cols="30" v-model="user.bio"></textarea>
  </div>
  <TimesDisplay
		:times="user ? user.roomTimes : []"
	/>
</template>

<style lang="scss">
textarea {
		background-color: #c3a6df;
		border: 2px solid blueviolet;
		border-radius: 0.3rem;
    font-family: 'Fira sans';
	}
</style>