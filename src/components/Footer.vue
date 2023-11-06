<template>
	<div v-if="userStore.isAuthenticated" class="footer-classes">
		<router-link to="/" class="main-logo">Fakeflix</router-link>
	</div>
</template>

<script setup>
import { useUserStore } from "../stores/user";

const userStore = useUserStore();
</script>

<style scoped>
.main-logo {
	@apply text-red-500 font-bold text-3xl mr-6 hover:text-red-700 transition-all duration-200;
}
.footer-classes {
	@apply flex w-full h-16 relative p-4 justify-between items-center font-medium bg-black/80 text-white;
}
</style>
