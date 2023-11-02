<template>
	<section class="flex flex-col">
		<Searchbar />
		<div v-for="movie in store.movies" :key="movie.imdbID">
			<h2>{{ movie.Title }}</h2>
		</div>
	</section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Searchbar from "@/components/Searchbar.vue";
import { useMoviesStore } from "@/stores/movies";

const store = useMoviesStore();

onMounted(() => {
	store.getAllMovies("batman");
	store.movies;
});
const value = ref(null);
</script>
