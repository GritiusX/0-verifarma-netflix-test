import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

const API_URL = "www.omdbapi.com";
const API_KEY = "6a66d7b4";

export const useMoviesStore = defineStore("moviesStore", () => {
	const movies = ref([]);
	const movie = ref({});
	const isLoading = ref(false);
	const loadingMessage = ref("Please wait! We are loading your movies");
	const errorMovieUnavailable = ref(
		"We are very sorry, this movie is not available"
	);
	const searchInputValue = ref("");
	const recentSearch = ref(localStorage.getItem("searchInputValue") || "");
	const totalPages = ref(1);
	const actualPage = ref(1);
	const hideNextMovieBtn = ref(false);
	const hidePrevMovieBtn = ref(false);

	const getAllMovies = async (keyword) => {
		if (!keyword) {
			keyword = "Batman";
		}
		//await new Promise((resolve) => setTimeout(resolve, 2000));

		try {
			localStorage.setItem("searchInputValue", keyword);
			recentSearch.value = keyword || "";
			isLoading.value = true;
			hideNextMovieBtn.value = false;
			const { data } = await axios.get(
				`http://${API_URL}/?apikey=${API_KEY}&&s=${keyword}`
			);
			movies.value = data.Search;
			totalPages.value = Math.ceil(data.totalResults / 10);
		} catch (error) {
			console.error("Failed to fetch movies:", error);
		} finally {
			isLoading.value = false;
			searchInputValue.value = "";
		}
	};
	const getNextPageMovies = async () => {
		try {
			if (actualPage.value < totalPages.value) {
				const nextPage = actualPage.value + 1;
				const keyword = recentSearch.value;
				const { data } = await axios.get(
					`http://${API_URL}?apikey=${API_KEY}&s=${keyword}&page=${nextPage}`
				);
				movies.value = data.Search;
				actualPage.value = nextPage;
				hidePrevMovieBtn.value = false;
				if (actualPage.value === totalPages.value) {
					hideNextMovieBtn.value = true;
				}
			}
		} catch (error) {
			console.error(error.message);
		}
	};

	const getPrevPageMovies = async () => {
		try {
			if (actualPage.value > 1) {
				const prevPage = actualPage.value - 1;
				const keyword = recentSearch.value;
				const { data } = await axios.get(
					`http://${API_URL}?apikey=${API_KEY}&s=${keyword}&page=${prevPage}`
				);
				movies.value = data.Search;
				actualPage.value = prevPage;
				hideNextMovieBtn.value = false;
				if (actualPage.value === 1) {
					hidePrevMovieBtn.value = true;
				}
			}
		} catch (error) {
			console.error(error.message);
		}
	};

	const getMovieById = async (movieId) => {
		isLoading.value = true;
		try {
			const { data } = await axios.get(
				`http://${API_URL}?apikey=${API_KEY}&i=${movieId}&plot=full`
			);
			movie.value = data;
		} catch (error) {
			console.error("Failed to fetch one movie:", error);
		} finally {
			isLoading.value = false;
		}
	};
	return {
		movies,
		movie,
		isLoading,
		loadingMessage,
		errorMovieUnavailable,
		searchInputValue,
		recentSearch,
		totalPages,
		hideNextMovieBtn,
		hidePrevMovieBtn,
		actualPage,
		getAllMovies,
		getNextPageMovies,
		getPrevPageMovies,
		getMovieById,
	};
});
