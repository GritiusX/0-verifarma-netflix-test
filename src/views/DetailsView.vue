<template>
	<div v-if="store.isLoading" class="loading-state-classes">
		<p class="text-2xl">Loading, please wait</p>
	</div>
	<section
		v-else
		class="flex flex-col lg:grid lg:grid-cols-2 w-full gap-4 mx-auto"
	>
		<div class="flex justify-center">
			<img
				class="w-full sm:w-[60%] lg:w-[90%] xl:w-[70%] 2xl:w-[50%] rounded-lg"
				v-if="filteredMovie.Poster"
				:src="filteredMovie.Poster"
				:alt="filteredMovie.Title"
			/>
			<img v-else src="@/assets/no-image.png" :alt="filteredMovie.Title" />
		</div>
		<div class="flex flex-col w-full gap-3 mx-auto">
			<h2 class="text-3xl text-center sm:text-start font-bold text-red-500">
				{{ filteredMovie.Title }}
			</h2>
			<div
				class="flex flex-col sm:grid sm:grid-cols-2 gap-2 font-medium text-red-500"
			>
				<p class="text-lg">
					Year:
					<span class="font-normal text-neutral-200">{{
						filteredMovie.Year
					}}</span>
				</p>
				<p class="text-lg">
					Rated:
					<span class="font-normal text-neutral-200">{{
						filteredMovie.Rated
					}}</span>
				</p>
				<p class="text-lg">
					Released date:
					<span class="font-normal text-neutral-200">{{
						filteredMovie.Released
					}}</span>
				</p>
				<p class="text-lg">
					Duration:
					<span class="font-normal text-neutral-200">{{
						filteredMovie.Runtime
					}}</span>
				</p>
			</div>
			<div
				class="flex flex-col sm:grid sm:grid-rows-2 sm:grid-cols-2 gap-2 font-medium text-red-500"
			>
				<p class="text-lg">
					Genre:
					<span class="font-normal text-neutral-200">{{
						filteredMovie.Genre
					}}</span>
				</p>
				<p class="text-lg">
					Director:
					<span class="font-normal text-neutral-200">{{
						filteredMovie.Director
					}}</span>
				</p>
				<p class="text-lg col-span-2">
					Main actors:
					<span class="font-normal text-neutral-200">{{
						filteredMovie.Actors
					}}</span>
				</p>
			</div>
			<p class="text-lg my-4">{{ filteredMovie.Plot }}</p>
			<div
				class="flex flex-col sm:grid sm:grid-rows-3 gap-x-4 gap-y-2 font-medium text-red-500"
			>
				<p class="text-lg">
					Language:
					<span class="font-normal text-neutral-200">
						{{ filteredMovie.Language }}
					</span>
				</p>
				<p class="text-lg">
					Country:
					<span class="font-normal text-neutral-200">
						{{ filteredMovie.Country }}</span
					>
				</p>
				<p class="text-lg">
					Awards:
					<span class="font-normal text-neutral-200">
						{{ filteredMovie.Awards }}</span
					>
				</p>
			</div>

			<div
				class="flex flex-col sm:grid sm:grid-rows-3 gap-x-4 gap-y-2 font-medium text-red-500"
			>
				<p
					v-for="ratings in filteredMovie.Ratings"
					:key="ratings.Source"
					class="text-lg"
				>
					{{ ratings.Source }}:
					<span class="font-normal text-neutral-200">{{ ratings.Value }}</span>
				</p>
			</div>
			<p class="text-red-500 text-lg font-medium">
				Box Office:
				<span class="font-normal text-neutral-200">
					{{ filteredMovie.BoxOffice }}
				</span>
			</p>
		</div>
	</section>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useMoviesStore } from "../stores/movies";

const store = useMoviesStore();
const router = useRouter();
const route = useRoute();
console.log("route", route);
console.log("router", router);
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
</style>
