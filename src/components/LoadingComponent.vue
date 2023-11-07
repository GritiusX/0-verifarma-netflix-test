<template>
	<div class="loading-container">
		<p class="text-2xl">{{ store.loadingMessage }}</p>
	</div>
</template>

<script setup>
import { useMoviesStore } from "../stores/movies";
const store = useMoviesStore();
</script>

<style scoped>
.loading-container {
	@apply flex justify-center bg-gray-600;
}
p {
	@apply text-2xl;
}
</style>
