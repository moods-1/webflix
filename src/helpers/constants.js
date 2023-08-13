import axios from 'axios';
const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

const instance = axios.create({
	baseURL: 'https://api.themoviedb.org/3',
});

export const youtubeSearch = `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&q=`;

// instance.get('/some-page'); =>  https://api.themoviedb.org/3/some-page

export default instance;

export const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;

export const MIXPANEL_TOKEN = process.env.REACT_APP_MIXPANEL_TOKEN;

export const REQUESTS = {
	fetchNetflixOriginals: `/discover/tv?api_key=${TMDB_API_KEY}&with_networks=213`,
	fetchAnimatedMovies: `/discover/movie?api_key=${TMDB_API_KEY}&with_genres=16`,
	fetchTrending: `/trending/all/week?api_key=${TMDB_API_KEY}&language=en-US`,
	fetchTopRated: `/movie/top_rated?api_key=${TMDB_API_KEY}&language=en-US`,
	fetchActionMovies: `/discover/movie?api_key=${TMDB_API_KEY}&with_genres=28`,
	fetchComedyMovies: `/discover/movie?api_key=${TMDB_API_KEY}&with_genres=35`,
	fetchSciFiMovies: `/discover/movie?api_key=${TMDB_API_KEY}&with_genres=878`,
	fetchRomanceMovies: `/discover/movie?api_key=${TMDB_API_KEY}&with_genres=10749`,
	fetchDocumentaries: `/discover/movie?api_key=${TMDB_API_KEY}&with_genres=99`,
	fetchDramas: `/discover/movie?api_key=${TMDB_API_KEY}&with_genres=18`,
	fetchHorrors: `/discover/movie?api_key=${TMDB_API_KEY}&with_genres=27`,
	fetchMusic: `/discover/movie?api_key=${TMDB_API_KEY}&with_genres=10402`,
	fetchFamily: `/discover/movie?api_key=${TMDB_API_KEY}&with_genres=10751`,
	fetchWarMovies: `/discover/movie?api_key=${TMDB_API_KEY}&with_genres=10752`,
	fetchCrimeMovies: `/discover/movie?api_key=${TMDB_API_KEY}&with_genres=80`,
	searchMovies: `/search/movie?api_key=${TMDB_API_KEY}&language=en-US&page=1&include_adult=false&query=`,
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

export const ROWS = [
	{
		title: 'NETFLIX Originals',
		url: REQUESTS.fetchNetflixOriginals,
		isLargeRow: true,
	},
	{
		title: 'Animated Movies',
		url: REQUESTS.fetchAnimatedMovies,
		isLargeRow: false,
	},
	// {
	// 	title: 'Trending Now',
	// 	url: REQUESTS.fetchTrending,
	// 	isLargeRow: false,
	// },
	// {
	// 	title: 'Top Rated',
	// 	url: REQUESTS.fetchTopRated,
	// 	isLargeRow: false,
	// },
	{
		title: 'Action Movies',
		url: REQUESTS.fetchActionMovies,
		isLargeRow: false,
	},
	// {
	// 	title: 'Sci-Fi Movies',
	// 	url: REQUESTS.fetchSciFiMovies,
	// 	isLargeRow: false,
	// },
	{
		title: 'Comedy Movies',
		url: REQUESTS.fetchComedyMovies,
		isLargeRow: false,
	},
	// {
	// 	title: 'Romance Movies',
	// 	fetchURL: REQUESTS.fetchRomanceMovies,
	// 	isLargeRow: false,
	// },
];

export const GENRES = {
	12: 'Adventure',
	14: 'Fantasy',
	16: 'Animation',
	18: 'Drama',
	27: 'Horror',
	28: 'Action',
	35: 'Comedy',
	36: 'History',
	37: 'Western',
	53: 'Thriller',
	80: 'Crime',
	99: 'Documentary',
	878: 'Science Fiction',
	9648: 'Mystery',
	10402: 'Music',
	10749: 'Romance',
	10751: 'Family',
	10752: 'War',
	10762: 'Kids',
	10763: 'News',
	10764: 'Realty',
	10765: 'Sci-Fi & Fantasy',
	10766: 'Soap',
	10767: 'Talk',
	10768: 'War & Politics',
	10770: 'TV Movie'
}