import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3"
,});

// instance.get('/some-page'); =>  https://api.themoviedb.org/3/some-page

export default instance;

export const API_KEY = process.env.REACT_APP_API_KEY;

export const REQUESTS = {
	fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
	fetchAnimatedMovies: `/discover/movie?api_key=${API_KEY}&with_genres=16`,
	fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
	fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
	fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
	fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
	fetchSciFiMovies: `/discover/movie?api_key=${API_KEY}&with_genres=878`,
	fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
	fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
	fetchDramas: `/discover/movie?api_key=${API_KEY}&with_genres=18`,
	fetchHorrors: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
	fetchMusic: `/discover/movie?api_key=${API_KEY}&with_genres=10402`,
	fetchFamily: `/discover/movie?api_key=${API_KEY}&with_genres=10751`,
	fetchWarMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10752`,
	fetchCrimeMovies: `/discover/movie?api_key=${API_KEY}&with_genres=80`,
	searchMovies: `/search/movie?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=`,
};

export const USER_NOTIFICATIONS = [
	{
		id: 1,
		message:
			'Your credit card is about to expire. Please update your payment information.',
	},
	{
		id: 2,
		message: "You've reached your maximum number of devices.",
	},
	{
		id: 3,
		message: 'Happy birthday from Webflix!',
	},
];

export const BROWSE_DATA = {
	ulMain: [
		'Home',
		'My List',
		'Originals',
		'New Arrivals',
		'Audio & Subtitles',
		'Ways to Watch',
	],
	ulLeft: ['TV', 'Action', 'Award-Winning', 'Comedies', 'Crime Films'],
	ulCenter: ['Documentaries', 'Dramas', 'Horror', 'Kids & family'],
	ulRight: ['Music & Musicals', 'Romance', 'Sci-Fi', 'War'],
};
