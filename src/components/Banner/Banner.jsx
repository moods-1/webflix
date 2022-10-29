import React, { useState, useEffect } from 'react';
import BeatLoader from 'react-spinners/BeatLoader';
import { useMediaQuery } from '@material-ui/core';
import Play from '@material-ui/icons/PlayCircleOutline';
import { BANNER_MOVIES } from '../../helpers/constants';
import TrailerModal from '../Modals/TrailerModal/TrailerModal';
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
	const mobile = useMediaQuery('(max-width:640px)');
	const largeMobile = useMediaQuery('(max-width:1024px)');

	const truncate = (str, n) =>
		str?.length > n ? str.substr(0, n - 1) + '...' : str;

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
		}
	}, [movies, selectedId]);

	return (
		<div className='banner-container'>
			<header
				className='banner'
				onMouseOver={() => setAutoTimer(false)}
				onMouseLeave={() => setAutoTimer(true)}
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
						<div style={{ position: 'absolute', zIndex: 1}}>
							{showTrailerModal && (
								<TrailerModal
									showTrailerModal={showTrailerModal}
									setShowTrailerModal={setShowTrailerModal}
									trailerUrl={movie.trailer}
								/>
							)}
							<div className='banner-contents'>
								<h1 className='banner-title'>{movie.title}</h1>
								<p className='banner-description'>
									{truncate(movie.overview, 150)}
								</p>
								{movie.trailer && (
									<Play
										className='banner-button'
										fontSize='large'
										onClick={() => setShowTrailerModal(true)}
									/>
								)}
							</div>
						</div>
					</>
				) : (
					<div className='banner-loader'>
						<BeatLoader color={'red'} />
					</div>
				)}
			</header>
			<div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
				{movies.map((_, index) => (
					<div
						key={`baner${index}`}
						onClick={() => setSelectedId(index)}
						className='banner-interval-button'
						style={{
							background: selectedId === index ? 'red' : '',
						}}
					/>
				))}
			</div>
			<p className='trailer-message'>*Some titles may not have a trailer.</p>
		</div>
	);
}

export default Banner;
