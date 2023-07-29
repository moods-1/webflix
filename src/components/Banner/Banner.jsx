import React, { useState, useEffect, useCallback } from 'react';
import BeatLoader from 'react-spinners/BeatLoader';
import { useMediaQuery, Button } from '@material-ui/core';
import Play from '@material-ui/icons/PlayCircleOutline';
import { useSelector, useDispatch } from 'react-redux';
import movieTrailer from 'movie-trailer';

import { storeBannerMedia } from '../../redux/mediaSlice';
import instance from '../../helpers/constants';
import { REQUESTS } from '../../helpers/constants';
import TrailerModal from '../Modals/TrailerModal/TrailerModal';
import MovieModal from '../Modals/MovieModal/MovieModal';
import {
	timeFormatter,
	textTruncater,
	searchYoutube,
} from '../../helpers/helperFunctions';
import DefaultBackdrop from '../../images/default-backdrop.jpg';
import DefaultPoster from '../../images/default-poster.jpg';
import './Banner.css';

const img_base_url = 'https://image.tmdb.org/t/p/';

function Banner({ mobile }) {
	const [movie, setMovie] = useState(null);
	const [movies, setMovies] = useState([]);
	const [showTrailerModal, setShowTrailerModal] = useState(false);
	const [trailerMap, setTrailerMap] = useState({});
	const [selectedId, setSelectedId] = useState(0);
	const [autoTimer, setAutoTimer] = useState(true);
	const [descriptionBody, setDescriptionBody] = useState('');
	const [showModal, setShowModal] = useState(false);
	const [showMobileDetailsButton, setShowMobileDetailsButton] = useState(false);
	const largeMobile = useMediaQuery('(max-width:1024px)');
	const storedMovies = useSelector((state) => state.media.bannerMedia);
	const dispatch = useDispatch();

	const handleBannerHover = () => {
		setAutoTimer(false);
		setShowMobileDetailsButton(true);
	};

	const handleBannerLeave = () => {
		setAutoTimer(true);
		setShowMobileDetailsButton(false);
	};

	const handleDescription = (chop) => {
		if (chop) {
			setDescriptionBody(textTruncater(movie.overview, 150));
		} else {
			setDescriptionBody(
				<>
					<p>{movie.overview}</p>
					<p className='mb-1'>
						Release date:{' '}
						{movie.release_date
							? `${timeFormatter(movie.release_date, 'DD-MMM-YYYY')}`
							: 'N/A'}
					</p>
					<p className='mb-0'>
						Rating: {movie.vote_average ? `${movie.vote_average}/10` : 'N/A'}
					</p>
				</>
			);
		}
	};

	const getYear = useCallback((movie) => {
		let releaseAirDate;
		if (movie.release_date)
			releaseAirDate = Number(movie?.release_date?.substr(0, 4));
		else releaseAirDate = Number(movie?.first_air_date?.substr(0, 4));
		return releaseAirDate;
	}, []);

	useEffect(() => {
		if (movie) {
			const { name, original_name, title, id } = movie;
			if (!trailerMap[id]) {
				const getTrailer = async (title) => {
					const subject = `${title} trailer`;
					const dt = await searchYoutube(subject);
					const { status, data } = dt;
					if (status < 301) {
						const item = data.items[0].id.videoId;
						setTrailerMap((prev) => ({
							...prev,
							[id]: item,
						}));
					} else {
						const year = getYear(movie);
						if (year) {
							movieTrailer(name|| title || original_name, { year, id: true })
								.then((url) => {
									setTrailerMap((prev) => ({
										...prev,
										[id]: url,
									}));
								})
								.catch((err) => console.log(err));
						}
					}
				};
				getTrailer(name || original_name || title);
			}
		}
	}, [movie, trailerMap]);

	useEffect(() => {
		if (storedMovies.length) {
			setMovies([...storedMovies]);
		} else {
			async function fetchData() {
				const request = await instance.get(REQUESTS.fetchSciFiMovies);
				const films = request.data.results.slice(0, 6);
				films.forEach((film) => {
					film.mobileImg = film.poster_path
						? img_base_url + `w342/${film.poster_path}`
						: DefaultPoster;
					film.desktopImg = film.backdrop_path
						? img_base_url + `w780/${film.backdrop_path}`
						: DefaultBackdrop;
				});
				dispatch(storeBannerMedia([...films]));
				setMovies([...films]);
				return request;
			}
			fetchData();
		}
	}, []);

	useEffect(() => {
		if (autoTimer) {
			let bannerTimer = setInterval(() => {
				if (selectedId === movies.length - 1) {
					setSelectedId(0);
				} else {
					setSelectedId((prev) => prev + 1);
				}
			}, 4000);
			return () => clearInterval(bannerTimer);
		}
	}, [movies, selectedId, autoTimer]);

	useEffect(() => {
		if (movies.length) {
			setMovie(movies[selectedId]);
			setDescriptionBody(textTruncater(movies[selectedId].overview, 150));
		}
	}, [movies, selectedId]);

	return (
		<div className='banner-container'>
			<header
				className='banner'
				onMouseOver={handleBannerHover}
				onMouseLeave={handleBannerLeave}
			>
				{movie ? (
					<>
						<div
							className='banner-large-image-box'
							style={{
								width: largeMobile ? '100%' : '50%',
								backgroundSize: `${mobile ? 'contain' : 'cover'}`,
								backgroundImage: `url(${
									mobile ? movie.mobileImg : movie.desktopImg
								})`,
								backgroundRepeat: 'no-repeat',
								backgroundPosition: 'top, center',
							}}
						/>
						<div style={{ position: 'absolute', zIndex: 1 }}>
							{showTrailerModal && (
								<TrailerModal
									showTrailerModal={showTrailerModal}
									close={() => {
										setAutoTimer(true);
										setShowTrailerModal(false);
									}}
									trailerUrl={trailerMap[movie.id]}
								/>
							)}
							<div className='banner-contents'>
								<h1 className='banner-title'>{movie.title}</h1>
								<div
									className='banner-description'
									onMouseOver={() => handleDescription(false)}
									onMouseLeave={(e) => handleDescription(true)}
								>
									{descriptionBody}
								</div>
								{movie.id in trailerMap && (
									<Play
										className='banner-button'
										fontSize='large'
										onClick={() => {
											setAutoTimer(false);
											setShowTrailerModal(true);
										}}
									/>
								)}
								{mobile && showMobileDetailsButton && (
									<Button
										variant='contained'
										onClick={() => setShowModal(true)}
										style={{
											position: 'absolute',
											top: '100%',
											left: '50%',
											transform: 'translate(-50%, 90%)',
											color: '#FFF',
											background: 'rgba(0,0,0,0.7)',
											fontSize: 10,
										}}
									>
										Details
									</Button>
								)}
							</div>
							{showModal && (
								<MovieModal
									showModal={showModal}
									setShowModal={setShowModal}
									currentTitle={movie}
								/>
							)}
						</div>
					</>
				) : (
					<div className='banner-loader'>
						<BeatLoader color={'red'} />
					</div>
				)}
			</header>
			<div className='banner-interval-buttons-box'>
				{movies.map((_, index) => (
					<div
						key={`baner${index}`}
						onClick={() => setSelectedId(index)}
						className={`banner-interval-button ${
							selectedId === index ? 'banner-interval-button-active' : ''
						}`}
					/>
				))}
			</div>
			<p className='trailer-message'>*Some titles may not have a trailer.</p>
		</div>
	);
}

export default Banner;
