import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

const API_URL = "www.omdbapi.com";
const API_KEY = "6a66d7b4";

export const useMoviesStore = defineStore("movies", () => {
	const movies = ref([]);
	const movie = ref({});
	const isLoading = ref(false);
	const loadingMessage = ref("Please wait! We are loading your movies");
	const userName = ref("");

	const getAllMovies = async (keyword) => {
		isLoading.value = true;
		if (!keyword) {
			keyword = "One Piece";
		}
		try {
			const { data } = await axios.get(
				`http://${API_URL}/?apikey=${API_KEY}&&s=${keyword}`
			);
			console.log(data.Search);
			movies.value = data.Search;
		} catch (error) {
			console.error("Failed to fetch movies:", error);
		}
	};
	return { movies, movie, isLoading, loadingMessage, userName, getAllMovies };
});
