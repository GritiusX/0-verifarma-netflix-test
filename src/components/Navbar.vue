<template>
	<nav
		:class="
			userStore.isAuthenticated ? `navbar-classes` : `logged-out-navbar-classes`
		"
	>
		<router-link to="/" class="main-logo">Fakeflix</router-link>
		<div v-if="userStore.isAuthenticated" class="desktop-nav">
			<div class="main-nav-buttons">
				<router-link
					class="router-link-class"
					to="/"
					activeClass="active-router-link-class"
					>Home</router-link
				>
			</div>

			<span class="sub-nav-buttons">
				<form @submit.prevent="handleSearchForm" class="search-bar-container">
					<XyzTransition xyz="fade left duration-5 ease-in-out">
						<InputText
							v-if="searchbarClicked"
							class="navbar-input-classes"
							v-model="store.searchInputValue"
							placeholder="Movie search"
						/>
					</XyzTransition>
					<MagnifyingGlassIcon
						@click="toggleSearchbar"
						class="h-8 w-8 cursor-pointer hover:text-red-500 transition-all duration-200"
					/>
				</form>
				<UserIcon class="h-8 w-8 cursor-not-allowed" />
			</span>
		</div>
		<div
			v-if="userStore.isAuthenticated"
			class="mobile-menu-button"
			@click="toggleMobileMenu"
		>
			<Bars3Icon class="h-8 w-8 text-blue-500" />
		</div>
	</nav>
	<XyzTransition xyz="fade up">
		<div class="mobile-nav" v-if="mobileMenu">
			<router-link to="/" activeClass="active-router-link-class"
				>Home</router-link
			>
			<span class="line-through">Profile</span>
		</div>
	</XyzTransition>
</template>

<script setup>
import {
	Bars3Icon,
	MagnifyingGlassIcon,
	UserIcon,
} from "@heroicons/vue/24/solid";
import { ref } from "vue";
import { useMoviesStore } from "../stores/movies";
import { useUserStore } from "../stores/user";
import { useRoute, useRouter } from "vue-router";

const store = useMoviesStore();
const userStore = useUserStore();
const route = useRoute();
const router = useRouter();

const mobileMenu = ref(false);
const searchbarClicked = ref(false);

const toggleMobileMenu = () => {
	mobileMenu.value = !mobileMenu.value;
};
const toggleSearchbar = () => {
	searchbarClicked.value = !searchbarClicked.value;
};

const handleSearchForm = () => {
	if (route.name !== "Home") {
		router.push("/");
	}
	store.getAllMovies(store.searchInputValue);
};
</script>

<style scoped>
.navbar-classes {
	@apply flex w-full h-16 relative p-4 justify-between items-center font-medium bg-black/80 text-white;
}
.logged-out-navbar-classes {
	@apply flex w-full justify-center p-4 bg-zinc-900;
}
.main-logo {
	@apply text-red-500 font-bold text-3xl mr-6 hover:text-red-700 transition-all duration-200;
}
.main-nav-buttons {
	@apply flex gap-3;
}
.desktop-nav {
	@apply hidden sm:flex w-full items-center gap-4 justify-between;
}
.mobile-nav {
	@apply sm:hidden flex absolute w-full flex-col gap-2 py-3 px-4 font-medium text-black bg-gray-300;
}
.active-router-link-class {
	@apply text-red-500;
}
.mobile-menu-button {
	@apply sm:hidden;
}
.sub-nav-buttons {
	@apply flex items-center gap-6 justify-end w-full mr-10;
}
.search-bar-container {
	@apply flex w-full lg:w-1/2 xl:w-1/3 3xl:w-1/5 justify-end items-center gap-4;
}
.router-link-class {
	@apply hover:text-red-300;
}
</style>
