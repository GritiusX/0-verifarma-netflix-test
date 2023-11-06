<template>
	<section class="home-view-container">
		<Searchbar class="searchbar-classes" />
		<section v-if="store.isLoading" class="loading-message-container">
			{{ store.loadingMessage }}
		</section>
		<MoviesContainer v-else :movies="store.movies" />
	</section>
</template>

<script setup>
import { onMounted } from "vue";
import Searchbar from "@/components/Searchbar.vue";
import { useMoviesStore } from "@/stores/movies";
import MoviesContainer from "../components/MoviesContainer.vue";
const store = useMoviesStore();
onMounted(() => {
	const latestSearch = localStorage.getItem("searchInputValue") ?? "Batman";
	store.getAllMovies(latestSearch);
});
</script>

<style scoped>
.searchbar-classes {
	@apply w-full 3xl:w-[80%] 4xl:w-[70%] 3xl:mx-auto;
}
.home-view-container {
	@apply flex flex-col w-full;
}
.loading-message-container {
	@apply self-center text-center text-2xl bg-gray-400 p-4 rounded-xl text-zinc-900;
}
</style>
