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

export const NOTIFICATIONS = [
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

export const BANNER_MOVIES = [
	{
		adult: false,
		backdrop_path: '/bQXAqRx2Fgc46uCVWgoPz5L5Dtr.jpg',
		genre_ids: [28, 878, 14],
		id: 436270,
		original_language: 'en',
		original_title: 'Black Adam',
		overview:
			'Nearly 5,000 years after he was bestowed with the almighty powers of the Egyptian gods—and imprisoned just as quickly—Black Adam is freed from his earthly tomb, ready to unleash his unique form of justice on the modern world.',
		popularity: 4438.636,
		poster_path: '/3zXceNTtyj5FLjwQXuPvLYK5YYL.jpg',
		release_date: '2022-10-19',
		title: 'Black Adam',
		video: false,
		vote_average: 7.1,
		vote_count: 623,
		trailer: 'NnjCUbIfKoM',
	},
	{
		adult: false,
		backdrop_path: '/etP5jwlwvkNhwe7jnI2AyA6ZKrR.jpg',
		genre_ids: [878],
		id: 575322,
		original_language: 'en',
		original_title: 'Звёздный разум',
		overview:
			"After depleting Earth's resources for centuries, humankind's survival requires an exodus to outer space. An international expedition is quickly formed to find a suitable new planet, but when plans go awry, the crew is suddenly stranded without power on a strange planet, where something unimaginable lies in wait.",
		popularity: 2137.304,
		poster_path: '/rFljUdOozFEv6HDHIFpFvcYW0ec.jpg',
		release_date: '2022-01-06',
		title: 'Project Gemini',
		video: false,
		vote_average: 5.6,
		vote_count: 132,
		trailer: 'IDnECGvaLfU',
	},
	{
		adult: false,
		backdrop_path: '/aIkG2V4UXrfkxMdJZmq30xO0QQr.jpg',
		genre_ids: [878, 12, 28],
		id: 791155,
		original_language: 'en',
		original_title: 'Secret Headquarters',
		overview:
			'While hanging out after school, Charlie and his friends discover the headquarters of the world’s most powerful superhero hidden beneath his home. When villains attack, they must team up to defend the headquarters and save the world.',
		popularity: 1572.458,
		poster_path: '/8PsHogUfvjWPGdWAI5uslDhHDx7.jpg',
		release_date: '2022-08-12',
		title: 'Secret Headquarters',
		video: false,
		vote_average: 6.9,
		vote_count: 135,
		trailer: '8THIILeZJ8U',
	},
	{
		adult: false,
		backdrop_path: '/jauI01vUIkPA0xVsamGj0Gs1nNL.jpg',
		genre_ids: [12, 28, 878],
		id: 507086,
		original_language: 'en',
		original_title: 'Jurassic World Dominion',
		overview:
			'Four years after the destruction of Isla Nublar, Biosyn operatives attempt to track down Maisie Lockwood, while Dr Ellie Sattler investigates a genetically engineered swarm of giant insects.',
		popularity: 1100.957,
		poster_path: '/kAVRgw7GgK1CfYEJq8ME6EvRIgU.jpg',
		release_date: '2022-06-01',
		title: 'Jurassic World Dominion',
		video: false,
		vote_average: 7,
		vote_count: 3735,
		trailer: 'wo6Y-czXa5w',
	},
	{
		adult: false,
		backdrop_path: '/7ZO9yoEU2fAHKhmJWfAc2QIPWJg.jpg',
		genre_ids: [53, 28, 878],
		id: 766507,
		original_language: 'en',
		original_title: 'Prey',
		overview:
			'When danger threatens her camp, the fierce and highly skilled Comanche warrior Naru sets out to protect her people. But the prey she stalks turns out to be a highly evolved alien predator with a technically advanced arsenal.',
		popularity: 1033.93,
		poster_path: '/ujr5pztc1oitbe7ViMUOilFaJ7s.jpg',
		release_date: '2022-08-05',
		title: 'Prey',
		video: false,
		vote_average: 7.9,
		vote_count: 4447,
		trailer: 'br5cxQXKtuc',
	},
	{
		adult: false,
		backdrop_path: '/iQJ1gC2p6yn5wnBEklhPaEFJ3n1.jpg',
		genre_ids: [16, 28, 878],
		id: 886396,
		original_language: 'en',
		original_title: 'Batman and Superman: Battle of the Super Sons',
		overview:
			'After discovering he has powers, 11-year-old Jonathan Kent and assassin-turned-Boy-Wonder Damian Wayne must join forces to rescue their fathers (Superman & Batman) and save the planet from the malevolent alien force known as Starro.',
		popularity: 920.525,
		poster_path: '/nBaVsNvUxIuvhPw3xTaAJIw8me4.jpg',
		release_date: '2022-10-17',
		title: 'Batman and Superman: Battle of the Super Sons',
		video: false,
		vote_average: 8,
		vote_count: 119,
		trailer: '3CRBmGS2tPM',
	},
];
