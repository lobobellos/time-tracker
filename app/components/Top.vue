<template>
	<div class="container" >
		<div class="logo">
			<router-link to="/">
				<img
					src="../assets/teamLogo.png"
					alt="team logo"
					id="logo"
				/>
			</router-link>
		</div>
		<div class="navbar" v-if="isLoggedIn()">
			<a @click="logOut">Log Out</a>
			<router-link to="/myAcct">
				My Account
			</router-link>
		</div>
		<div class="navbar" v-else>
			<router-link  to="/createAcct">
				Create Account
			</router-link>
			<router-link to="/login">
				Log in
			</router-link>
		</div>
	</div>
</template>

<script setup lang="ts">
import Cookies from 'js-cookie'

const isLoggedIn = function(){
	return Cookies.get('id') != undefined
}

function logOut(){
	Cookies.remove('id')
	window.location.reload()
}
</script>

<style scoped lang="scss">
.container {
	display: flex;
	flex-direction: row;
	background-color: rgb(165, 109, 218);
	justify-content: space-between;
	align-items: center;
	.navbar {
		display: flex;
		flex-direction: row;
		margin-right: 0.5rem;
		a {
			margin-right: 0.4rem;
			margin-left: 0.4rem;
			margin-bottom: 0.5rem;
			font-family: 'Fira Sans', sans-serif;
			font-size: 1.2rem;
			font-weight: 400;
			display: flex;
			align-items: flex-end;
			text-align: bottom;
			text-decoration: none;
			color: rgb(255, 255, 255);
			background-color: rgb(92, 37, 180);
			padding: 0.5rem;
			border-radius: 0.5rem;
		}
	}
}

#logo {
	align-self: left;
	width: 50px;
}

</style>
