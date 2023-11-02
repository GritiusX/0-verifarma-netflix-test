<template>
	<Navbar />
	<main class="main-background">
		<RouterView />
	</main>
	<Footer />
</template>

<script setup>
import Footer from "./components/Footer.vue";
import Navbar from "./components/Navbar.vue";
import { RouterView } from "vue-router";
</script>

<style>
.main-background {
	@apply flex flex-col w-full bg-zinc-900 p-8 text-neutral-200;
}
.navbar-input-classes {
	@apply p-2 bg-zinc-900 text-neutral-200 font-normal w-full rounded-lg outline-offset-0 outline-1 outline-red-300 placeholder:text-gray-400;
}
</style>
