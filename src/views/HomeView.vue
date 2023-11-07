<template>
	<section class="home-view-container">
		<Searchbar class="searchbar-classes" />
		<div v-if="store.isLoading" class="loading-state-classes">
			<LoadingComponent />
		</div>
		<MoviesContainer v-else :movies="store.movies" />
	</section>
</template>

<script setup>
import { onMounted } from "vue";
import Searchbar from "@/components/Searchbar.vue";
import { useMoviesStore } from "@/stores/movies";
import MoviesContainer from "../components/MoviesContainer.vue";
import LoadingComponent from "../components/LoadingComponent.vue";
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
.loading-state-classes {
	@apply bg-gray-600 w-full xs:w-[90%] sm:w-[50%] lg:w-[40%] 2xl:w-[30%] 4xl:w-[25%] text-center self-center py-2 px-3 rounded-lg;
}
.home-view-container {
	@apply flex flex-col w-full;
}
.loading-message-container {
	@apply self-center text-center text-2xl bg-gray-400 p-4 rounded-xl text-zinc-900;
}
</style>
