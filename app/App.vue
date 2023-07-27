<script setup lang="ts">
import Top from './components/Top.vue'
</script>

<template>
	<div class="container">
		<Top />
		<div class="router-container">
			<router-view></router-view>
		</div>
	</div>
</template>

<style scoped>
.router-container {
	margin-left: 1rem;
	margin-right: 1rem;
}
</style>
