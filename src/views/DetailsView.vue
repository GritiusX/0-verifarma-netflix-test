<template>
	<div v-if="store.isLoading" class="loading-state-classes">
		<p class="text-2xl">Loading, please wait</p>
	</div>
	<section v-else class="main-container-section">
		<div class="image-container">
			<img
				class="image-classes"
				v-if="filteredMovie.Poster"
				:src="filteredMovie.Poster"
				:alt="filteredMovie.Title"
			/>
			<img v-else src="@/assets/no-image.png" :alt="filteredMovie.Title" />
		</div>
		<div class="movie-info-container">
			<h2 class="movie-title">
				{{ filteredMovie.Title }}
			</h2>
			<div class="year-info-section">
				<p>
					Year:
					<span>{{ filteredMovie.Year }}</span>
				</p>
				<p>
					Rated:
					<span>{{ filteredMovie.Rated }}</span>
				</p>
				<p>
					Released date:
					<span>{{ filteredMovie.Released }}</span>
				</p>
				<p>
					Duration:
					<span>{{ filteredMovie.Runtime }}</span>
				</p>
			</div>
			<div class="genre-director-section">
				<p>
					Genre:
					<span>{{ filteredMovie.Genre }}</span>
				</p>
				<p>
					Director:
					<span>{{ filteredMovie.Director }}</span>
				</p>
				<p>
					Main actors:
					<span>{{ filteredMovie.Actors }}</span>
				</p>
			</div>
			<p class="movie-plot-classes">
				{{ filteredMovie.Plot }}
			</p>
			<div class="language-country-section">
				<p>
					Language:
					<span>
						{{ filteredMovie.Language }}
					</span>
				</p>
				<p>
					Country:
					<span> {{ filteredMovie.Country }}</span>
				</p>
				<p>
					Awards:
					<span> {{ filteredMovie.Awards }}</span>
				</p>
			</div>

			<div class="ratings-section">
				<p v-for="ratings in filteredMovie.Ratings" :key="ratings.Source">
					{{ ratings.Source }}:
					<span>{{ ratings.Value }}</span>
				</p>
			</div>
			<p class="box-office-paragraph">
				Box Office:
				<span>
					{{ filteredMovie.BoxOffice }}
				</span>
			</p>
		</div>
	</section>
</template>

<script setup>
import { onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useMoviesStore } from "../stores/movies";

const store = useMoviesStore();
const router = useRouter();
const route = useRoute();
onMounted(() => {
	store.getMovieById(route.params.id);
});

const filteredMovie = computed(() => {
	const movie = store.movie;

	const filtered = { ...movie };
	for (const key in filtered) {
		if (filtered[key] === "N/A") {
			delete filtered[key];
		}
	}
	return filtered;
});
</script>

<style scoped>
.loading-state-classes {
	@apply bg-gray-600 w-full xs:w-[90%] sm:w-[50%] lg:w-[40%] 2xl:w-[30%] 4xl:w-[25%] text-center self-center py-2 px-3 rounded-lg;
}
.main-container-section {
	@apply flex flex-col lg:grid lg:grid-cols-2 w-full gap-4 mx-auto;
}
.image-container {
	@apply flex justify-center;
}
.image-classes {
	@apply w-full sm:w-[60%] lg:w-[90%] xl:w-[70%] 2xl:w-[50%] rounded-lg;
}
.movie-info-container {
	@apply flex flex-col w-full gap-3 mx-auto;
}
.movie-title {
	@apply text-3xl text-center sm:text-start font-bold text-red-500;
}
.year-info-section {
	@apply flex flex-col sm:grid sm:grid-cols-2 gap-2 font-medium text-red-500;
}
p {
	@apply text-lg;
}
span {
	@apply font-normal text-neutral-200;
}
.genre-director-section {
	@apply flex flex-col sm:grid sm:grid-rows-2 sm:grid-cols-2 gap-2 font-medium text-red-500;
}
.movie-plot-classes {
	@apply text-lg my-4 xl:w-[80%] 3xl:w-[75%];
}
.language-country-section {
	@apply flex flex-col sm:grid sm:grid-rows-3 gap-x-4 gap-y-2 font-medium text-red-500;
}
.ratings-section {
	@apply flex flex-col sm:grid sm:grid-rows-3 gap-x-4 gap-y-2 font-medium text-red-500;
}
.box-office-paragraph {
	@apply text-red-500 text-lg font-medium;
}
</style>
