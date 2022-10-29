export const API_KEY = 'db6f15328c0fbe319f9c31ef6757d596';

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
        "title": "Black Adam",
        "id": 436270,
        "overview": "Nearly 5,000 years after he was bestowed with the almighty powers of the Egyptian gods—and imprisoned just as quickly—Black Adam is freed from his earthly tomb, ready to unleash his unique form of justice on the modern world.",
        "rating": 7.1,
        "trailer": "NnjCUbIfKoM"
    },
    {
        "title": "Project Gemini",
        "id": 575322,
        "overview": "After depleting Earth's resources for centuries, humankind's survival requires an exodus to outer space. An international expedition is quickly formed to find a suitable new planet, but when plans go awry, the crew is suddenly stranded without power on a strange planet, where something unimaginable lies in wait.",
        "rating": 5.5,
        "trailer": "IDnECGvaLfU"
    },
    {
        "title": "Secret Headquarters",
        "id": 791155,
        "overview": "While hanging out after school, Charlie and his friends discover the headquarters of the world’s most powerful superhero hidden beneath his home. When villains attack, they must team up to defend the headquarters and save the world.",
        "rating": 6.9,
        "trailer": "8THIILeZJ8U"
    },
    {
        "title": "Prey",
        "id": 766507,
        "overview": "When danger threatens her camp, the fierce and highly skilled Comanche warrior Naru sets out to protect her people. But the prey she stalks turns out to be a highly evolved alien predator with a technically advanced arsenal.",
        "rating": 7.9,
        "trailer": "br5cxQXKtuc"
    },
    {
        "title": "Jurassic World Dominion",
        "id": 507086,
        "overview": "Four years after the destruction of Isla Nublar, Biosyn operatives attempt to track down Maisie Lockwood, while Dr Ellie Sattler investigates a genetically engineered swarm of giant insects.",
        "rating": 7,
        "trailer": "wo6Y-czXa5w"
    },
    {
        "title": "Dragon Ball Super: Super Hero",
        "id": 610150,
        "overview": "The Red Ribbon Army, an evil organization that was once destroyed by Goku in the past, has been reformed by a group of people who have created new and mightier Androids, Gamma 1 and Gamma 2, and seek vengeance against Goku and his family.",
        "rating": 8,
        "trailer": "GD8nCSr54PA"
    }
]