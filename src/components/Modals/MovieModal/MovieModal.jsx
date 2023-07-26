import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core';
import Play from '@material-ui/icons/PlayCircleOutline';
import { timeFormatter } from '../../../helpers/helperFunctions';
import movieTrailer from 'movie-trailer';
import TrailerModal from '../TrailerModal/TrailerModal';

const img_base_url = 'https://image.tmdb.org/t/p/original';
const useStyles = makeStyles({
	backdrop: {
		position: 'fixed',
		top: 0,
		left: 0,
		width: '100%',
		minHeight: '100vh',
		background: 'rgba(0,0,0,0.5)',
		color: '#FFF',
		display: 'grid',
		placeItems: 'center',
		zIndex: 99,
	},
	modal: {
		position: 'relative',
		width: 480,
		minWidth: 280,
		minHeight: '60vh',
		padding: 50,
		marginTop: 30,
		background: '#000',
		borderRadius: 5,
		boxShadow: '0px 0px 7px red',
		'& p': {
			fontSize: 14,
		},
		'@media (max-width:500px)': {
			width: '100%',
			padding: '45px 15px 15px',
		},
		'@media (max-height:500px)': {
			overflowY: 'auto',
		},
	},
	closeBtn: {
		cursor: 'pointer',
		position: 'absolute',
		top: 15,
		right: 15,
		width: 20,
		color: '#FFF',
		zIndex: 100,
		fontSize: 16,
	},
	poster: {
		padding: 10,
		boxSizing: 'border-box',
		position: 'relative',
		width: '100%',
		height: '65%',
		minHeight: 260,
		textAlign: 'center',
		overflowX: 'hidden',
		'@media (max-height:800px)': {
			height: '60%',
			overflowY: 'auto',
		},
		'@media (max-height:500px)': {
			'& img': {
				height: '100%',
				width: '50%',
			},
		},
		'@media (max-width:440px)': {
			'& img': {
				height: '100%',
				width: '100%',
			},
		},
	},
	modalPlay: {
		borderRadius: '50%',
		background: 'rgba(9,9,9,0.2)',
		cursor: 'pointer',
		fontSize: 50,
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		'&:hover': {
			boxShadow: '0px 0px 8px green',
		},
	},
	overviewDetails: {
		height: 120,
		paddingRight: 7,
		overflowY: 'auto',
	},
});

function MovieModal({ showModal, setShowModal, currentTitle }) {
	const [showTrailerModal, setShowTrailerModal] = useState(false);
	const [trailerUrl, setTrailerUrl] = useState('');
	const classes = useStyles();
	const { overview, release_date, poster_path, vote_average } = currentTitle;
	const movieRef = useRef();

	const getYear = (movie) => {
		let releaseAirDate;
		if (movie.release_date)
			releaseAirDate = Number(movie.release_date.substring(0, 4));
		else if (movie.first_air_date) {
			releaseAirDate = Number(movie.first_air_date.substring(0, 4));
		}
		return releaseAirDate;
	};

	useEffect(() => {
		let movie = currentTitle;
		movieRef.current = poster_path;
		let date = getYear(movie);
		if (date) {
			movieTrailer(
				movie.name || movie.title || movie?.original_name || '',
				date
			)
				.then((url) => {
					const urlParams = new URLSearchParams(new URL(url).search);
					setTrailerUrl(urlParams.get('v'));
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, [currentTitle, poster_path]);

	useEffect(() => {
		window.addEventListener('resize', () => setShowModal(false));
		return () => window.removeEventListener('resize', () => {});
	}, [setShowModal]);

	const handleTrailer = () => {
		setShowModal(false);
		setShowTrailerModal(true);
	};

	const handleClose = () => {
		setShowModal(false);
		if (!movieRef.current?.value === currentTitle.poster_path) {
			setTrailerUrl('');
		}
	};

	const releaseDate = release_date
		? timeFormatter(release_date, 'DD-MMM-YYYY')
		: 'N/A';

	const noPosterTitle = () => {
		const { original_title, title, release_date } = currentTitle;
		let movieTitle = original_title ? original_title : title;
		let releaseDate = release_date.substring(0, 4);
		return `${movieTitle} (${releaseDate})`;
	};

	const noDetailsMessage = 'Sorry, there is no description for this title.';

	return (
		<>
			<div
				className={classes.backdrop}
				onClick={handleClose}
				style={{ display: `${showModal ? '' : 'none'}` }}
			>
				<div className={classes.modal}>
					<p className={classes.closeBtn} onClick={handleClose}>
						X
					</p>
					<div className={classes.poster}>
						<img
							src={
								poster_path
									? img_base_url + poster_path
									: '/images/noPoster.jpg'
							}
							alt='poster'
							height='100%'
							width='80%'
						/>
						{trailerUrl && (
							<Play
								className={classes.modalPlay}
								onClick={() => handleTrailer()}
							/>
						)}
					</div>
					<div style={{ marginTop: 20 }}>
						{!poster_path && (
							<div>
								<p>
									Title: <span>{noPosterTitle()}</span>
								</p>
							</div>
						)}
						<p className={overview.length > 250 ? classes.overviewDetails : ''}>
							{overview || noDetailsMessage}
						</p>
						<p>
							<span>Release date: </span>
							{releaseDate}
							<br />
							<span>Rating: </span>
							{vote_average} / 10
						</p>
					</div>
				</div>
			</div>
			{showTrailerModal && (
				<TrailerModal
					showTrailerModal={showTrailerModal}
					close={() => setShowTrailerModal(false)}
					trailerUrl={trailerUrl}
				/>
			)}
		</>
	);
}

export default MovieModal;
