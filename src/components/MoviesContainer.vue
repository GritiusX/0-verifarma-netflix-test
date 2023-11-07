<template>
	<article v-if="!movies" class="movies-error-container">
		<ErrorComponent />
	</article>
	<article v-else>
		<div class="pagination-container">
			<div class="prev-button">
				<button
					v-if="!store.hidePrevMovieBtn"
					@click="handlePrevPage"
					class="pagination-button"
				>
					<ChevronLeftIcon class="pagination-icon" />
				</button>
			</div>
			<div class="next-button-container">
				<button
					v-if="!store.hideNextMovieBtn"
					@click="handleNextPage"
					class="pagination-button"
				>
					<ChevronRightIcon class="pagination-icon" />
				</button>
			</div>
		</div>
		<div class="movies-container">
			<XyzTransition
				v-for="movie in movies"
				appear
				xyz="fade duration-5 ease-in-out"
				mode="out-in"
			>
				<Movie class="movie" :key="movie.imdbID" :movie="movie" />
			</XyzTransition>
		</div>
	</article>
</template>
<!-- chevron-left -->
<script setup>
import { ref } from "vue";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/24/solid";
import Movie from "@/components/Movie.vue";
import { useMoviesStore } from "../stores/movies";
import ErrorComponent from "./ErrorComponent.vue";
defineProps({
	movies: {
		type: Object,
	},
});
const page = ref(1);
const store = useMoviesStore();

const handleNextPage = () => {
	page.value = page.value + 1;
	return store.getNextPageMovies(page.value);
};
const handlePrevPage = () => {
	page.value = page.value - 1;
	return store.getPrevPageMovies(page.value);
};
</script>

<style lang="scss" scoped>
.movies-error-container {
	@apply self-center;
}
.pagination-container {
	@apply grid grid-cols-2 gap-8 w-[70%] mx-auto mb-4;
}
.prev-button-container {
	@apply col-start-1 self-start;
}
.next-button-container {
	@apply flex col-start-2 justify-end;
}
.pagination-button {
	@apply w-12 bg-red-500 rounded-xl hover:bg-red-700 transition-all duration-300;
}
.pagination-icon {
	@apply h-10 w-10 mx-auto;
}
.movies-container {
	@apply relative flex flex-col w-full 3xl:w-[80%] 4xl:w-[70%] gap-4 mx-auto sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 justify-items-center items-center;
}
</style>
