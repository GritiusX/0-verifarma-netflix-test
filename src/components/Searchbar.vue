<template>
	<form @submit.prevent="handleSearchForm" class="searchbar-form-container">
		<h2 class="searchbar-title">MOVIES & SHOWS</h2>
		<h4>Here you will be able to search for any movie or show you like!</h4>
		<div class="flex gap-4">
			<div class="p-input-icon-left searchbar-container">
				<i class="pi pi-search" />
				<InputText
					class="navbar-input-classes searchbar-classes"
					v-model="store.searchInputValue"
					placeholder="Search"
				/>
			</div>
			<button
				type="submit"
				class="flex gap-2 justify-center py-2 px-3 rounded-lg w-28 bg-red-500 hover:bg-red-700 transition-all duration-300"
			>
				<MagnifyingGlassIcon class="h-6 w-6" /> Search
			</button>
		</div>
		<div>
			<p class="latest-search-title">
				Latest search:
				<span class="latest-search-classes">{{ store.recentSearch }}</span>
			</p>
		</div>
	</form>
</template>

<script setup>
import { useMoviesStore } from "../stores/movies";
import { MagnifyingGlassIcon } from "@heroicons/vue/24/solid";
const store = useMoviesStore();

const handleSearchForm = () => {
	store.getAllMovies(store.searchInputValue);
};
</script>

<style lang="scss" scoped>
.searchbar-form-container {
	@apply flex flex-col gap-4 pb-7;
}
.searchbar-title {
	@apply text-3xl tracking-wider cursor-default;
}
.searchbar-classes {
	@apply border-none outline-none outline-offset-0 outline-0;
}
.searchbar-container {
	@apply flex items-center gap-2 border rounded-lg px-2 w-[450px] focus-within:outline focus-within:outline-1 focus-within:border-red-500 focus-within:outline-red-500 focus-within:text-red-500 transition-all duration-300;
}
.latest-search-classes {
	@apply text-red-500 font-medium;
}
.latest-search-title {
	@apply text-lg;
}
</style>
