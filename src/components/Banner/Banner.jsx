import React, { useState, useEffect, useCallback } from 'react';
import BeatLoader from 'react-spinners/BeatLoader';
import { useMediaQuery, Button } from '@material-ui/core';
import Play from '@material-ui/icons/PlayCircleOutline';
import { useSelector, useDispatch } from 'react-redux';

import { storeBannerMedia } from '../../redux/mediaSlice';
import { CATEGORY_IDS } from '../../helpers/constants';
import TrailerModal from '../Modals/TrailerModal/TrailerModal';
import MovieModal from '../Modals/MovieModal/MovieModal';
import { timeFormatter, textTruncater } from '../../helpers/helperFunctions';
import './Banner.css';
import Genres from '../Modals/MovieModal/Genres';
import { getVideosByCategoryId } from '../../api/video';

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
	const categoryId = CATEGORY_IDS.BANNER;

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
					<Genres genres={movie.genreIds} color='#fff' background='#f00' />
					<p className='mb-1'>
						Release date:{' '}
						{movie.releaseDate
							? `${timeFormatter(movie.releaseDate, 'DD-MMM-YYYY')}`
							: 'N/A'}
					</p>
					<p className='mb-0'>
						Rating: {movie.voteAverage ? `${movie.voteAverage}/10` : 'N/A'}
					</p>
				</>
			);
		}
	};

	const getYear = useCallback((movie) => {
		let releaseAirDate;
		if (movie.releaseDate)
			releaseAirDate = Number(movie?.releaseDate?.substr(0, 4));
		else releaseAirDate = Number(movie?.firstAirDate?.substr(0, 4));
		return releaseAirDate;
	}, []);

	useEffect(() => {
		const setTrailers = (media) => {
			const localMap = {};
			media.forEach((m) => {
				const { id, trailerId } = m;
				if (trailerId) {
					localMap[id] = trailerId;
				}
			});
			setTrailerMap({ ...localMap });
		};

		if (storedMovies.length) {
			setTrailers([...storedMovies]);
			setMovies([...storedMovies]);
		} else {
			async function fetchData() {
				const request = await getVideosByCategoryId(categoryId);
				const { status, response } = request;
				if (status < 400) {
					dispatch(storeBannerMedia([...response]));
					setTrailers([...response]);
					setMovies([...response]);
				}
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
								width: largeMobile ? '100%' : '65%',
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
