import React, { useState, useEffect } from 'react';
import BeatLoader from 'react-spinners/BeatLoader';
import { useMediaQuery, Button } from '@material-ui/core';
import Play from '@material-ui/icons/PlayCircleOutline';
import { BANNER_MOVIES } from '../../helpers/constants';
import TrailerModal from '../Modals/TrailerModal/TrailerModal';
import MovieModal from '../Modals/MovieModal/MovieModal';
import { timeFormatter, textTruncater } from '../../helpers/helperFunctions';
import './Banner.css';
import {
	Movie0,
	Movie1,
	Movie2,
	Movie3,
	Movie4,
	Movie5,
	Movie0Mobile,
	Movie1Mobile,
	Movie2Mobile,
	Movie3Mobile,
	Movie4Mobile,
	Movie5Mobile,
} from '../../images/banner';

function Banner() {
	const [movie, setMovie] = useState(null);
	const [movies, setMovies] = useState([]);
	const [showTrailerModal, setShowTrailerModal] = useState(false);
	const [selectedId, setSelectedId] = useState(0);
	const [autoTimer, setAutoTimer] = useState(true);
	const [descriptionBody, setDescriptionBody] = useState('');
	const [showModal, setShowModal] = useState(false);
	const [showMobileDetailsButton, setShowMobileDetailsButton] = useState(false);
	const mobile = useMediaQuery('(max-width:640px)');
	const largeMobile = useMediaQuery('(max-width:1024px)');

	const handleBannerHover = () => {
		setAutoTimer(false);
		setShowMobileDetailsButton(true);
	};

	const handleBannerLeave = () => {
		setAutoTimer(true);
		setShowMobileDetailsButton(false);
	};

	useEffect(() => {
		const bannerBackdropImages = [
			Movie0,
			Movie1,
			Movie2,
			Movie3,
			Movie4,
			Movie5,
		];

		const bannerPosterImages = [
			Movie0Mobile,
			Movie1Mobile,
			Movie2Mobile,
			Movie3Mobile,
			Movie4Mobile,
			Movie5Mobile,
		];

		const localMovies = BANNER_MOVIES;

		localMovies.forEach((film, index) => {
			film.backdrop = bannerBackdropImages[index];
			film.poster = bannerPosterImages[index];
		});
		setMovies(localMovies);
	}, []);

	useEffect(() => {
		if (autoTimer) {
			let bannerTimer = setInterval(() => {
				if (selectedId === movies.length - 1) {
					setSelectedId(0);
				} else {
					setSelectedId(selectedId + 1);
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
									mobile ? movie.poster : movie.backdrop
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
									trailerUrl={movie.trailer}
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
								{movie.trailer && (
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
