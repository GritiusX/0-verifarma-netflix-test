<template>
	<div class="error-container">
		<p>{{ store.errorMovieUnavailable }}</p>
	</div>
</template>

<script setup>
import { useMoviesStore } from "../stores/movies";
const store = useMoviesStore();
</script>

<style scoped>
.error-container {
	@apply text-2xl bg-red-700 p-4 rounded-2xl self-center text-center;
}
p {
	@apply text-2xl;
}
</style>
