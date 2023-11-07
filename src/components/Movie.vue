<template>
	<router-link :to="`/${movie.imdbID}`">
		<Card class="card-container">
			<template #header>
				<img
					class="card-poster"
					v-if="shouldDisplayImage"
					:alt="movie.Title"
					:src="movie.Poster"
				/>
				<img
					class="card-no-poster"
					v-else
					alt="Image not found"
					src="@/assets/no-image.png"
				/>
			</template>
			<template #title>
				<p class="movie-title">
					{{ movie.Title }}
				</p>
			</template>
			<template #subtitle>
				<p class="movie-year">({{ movie.Year }})</p>
			</template>
		</Card>
	</router-link>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
	movie: {
		type: Object,
	},
});

const shouldDisplayImage = computed(() => {
	return props.movie.Poster !== "N/A";
});
</script>

<style scoped>
.card-container {
	@apply flex flex-col gap-3 w-full h-[30rem] xs:w-[16rem] items-center px-3 py-3 rounded-xl bg-gray-600 hover:text-red-800 hover:bg-gray-400 transition-all duration-300;
}
.card-poster {
	@apply h-[390px] w-[280px] object-cover rounded-xl;
}
.card-no-poster {
	@apply h-[390px] w-[280px] object-contain rounded-xl;
}
.movie-title {
	@apply w-full font-medium text-lg text-center line-clamp-1;
}
.movie-year {
	@apply font-medium text-lg text-center;
}
</style>
