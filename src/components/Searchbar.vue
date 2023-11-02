<template>
	<div class="flex flex-col gap-4 w-full pb-7">
		<h2 class="text-3xl tracking-wider cursor-default">MOVIES</h2>
		<h4>Here you will be able to search for any movie you like!</h4>
		<div class="p-input-icon-left search-bar-container">
			<i class="pi pi-search" />
			<InputText
				class="navbar-input-classes search-bar-classes"
				v-model="value1"
				placeholder="Search"
			/>
		</div>
	</div>
</template>

<script setup></script>

<style lang="scss" scoped>
.search-bar-classes {
	@apply border-none outline-none outline-offset-0 outline-0;
}
.search-bar-container {
	@apply flex items-center gap-2 border rounded-lg px-2 max-w-[450px] focus-within:outline focus-within:outline-1 focus-within:border-red-500 focus-within:outline-red-500 focus-within:text-red-500 transition-all duration-300;
}
</style>
