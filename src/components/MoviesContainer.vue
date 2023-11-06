<template>
	<article
		v-if="!movies"
		class="text-2xl bg-red-700 p-4 rounded-2xl self-center"
	>
		<p class="text-center">{{ store.errorMovieUnavailable }}</p>
	</article>
	<article v-else>
		<div class="grid grid-cols-2 gap-8 w-[70%] mx-auto mb-4">
			<div class="col-start-1 self-start">
				<button
					v-if="!store.hidePrevMovieBtn"
					@click="handlePrevPage"
					class="w-12 bg-red-500 rounded-xl hover:bg-red-700 transition-all duration-300"
				>
					<ChevronLeftIcon class="h-10 w-10 mx-auto" />
				</button>
			</div>
			<div class="flex col-start-2 justify-end">
				<button
					v-if="!store.hideNextMovieBtn"
					@click="handleNextPage"
					class="w-12 bg-red-500 rounded-xl hover:bg-red-700 transition-all duration-300"
				>
					<ChevronRightIcon class="h-10 w-10 mx-auto" />
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
.movies-container {
	@apply relative flex flex-col w-full 3xl:w-[80%] 4xl:w-[70%] gap-4 mx-auto sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 justify-items-center items-center;
}
.movie {
	--xyz-opacity: 0;
}
</style>
