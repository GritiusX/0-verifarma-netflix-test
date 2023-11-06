<template>
	<router-link :to="`/${movie.imdbID}`">
		<Card
			class="flex flex-col gap-3 w-full h-[30rem] xs:w-[16rem] items-center px-3 py-3 rounded-xl bg-gray-600 hover:text-red-800 hover:bg-gray-400 transition-all duration-300"
		>
			<template #header>
				<img
					class="h-[390px] w-[280px] object-cover rounded-xl"
					v-if="shouldDisplayImage"
					:alt="movie.Title"
					:src="movie.Poster"
				/>
				<img
					class="h-[390px] w-[280px] object-contain rounded-xl"
					v-else
					alt="Image not found"
					src="@/assets/no-image.png"
				/>
			</template>
			<template #title>
				<div class="w-full">
					<p class="w-full font-medium text-lg text-center line-clamp-1">
						{{ movie.Title }}
					</p>
				</div>
			</template>
			<template #subtitle>
				<p class="font-medium text-lg text-center">({{ movie.Year }})</p>
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

<style lang="scss" scoped></style>
