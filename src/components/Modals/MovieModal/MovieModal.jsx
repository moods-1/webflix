import React, { useState, useEffect, useRef, useCallback } from 'react';
import { makeStyles } from '@material-ui/core';
import Play from '@material-ui/icons/PlayCircleOutline';
import movieTrailer from 'movie-trailer';

import TrailerModal from '../TrailerModal/TrailerModal';
import { searchYoutube } from '../../../helpers/helperFunctions';

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
		width: '90%',
		maxWidth: '900px',
		minWidth: 280,
		minHeight: '50vh',
		marginTop: 30,
		background: '#000',
		borderRadius: 5,
		boxShadow: '0px 0px 3px #ddd',
		'& p': {
			fontSize: 14,
		},
		'@media (max-width:500px)': {
			width: '100%',
		},
		'@media (max-height:500px)': {
			overflowY: 'auto',
		},
	},
	closeBtn: {
		cursor: 'pointer',
		position: 'absolute',
		display: 'grid',
		placeItems: 'center',
		top: 15,
		right: 15,
		width: 30,
		height: 30,
		borderRadius: '50%',
		color: '#FFF',
		zIndex: 100,
		fontSize: 16,
		background: 'rgba(0, 0, 0, 0.5)',
	},
	poster: {
		padding: 10,
		boxSizing: 'border-box',
		position: 'relative',
		width: '100%',
		height: '65%',
		textAlign: 'center',
		overflowX: 'hidden',
		'@media (max-height:800px)': {
			height: '60%',
			overflowY: 'auto',
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
			boxShadow: '0px 0px 8px red',
		},
	},
	details: {
		background: '#111',
		padding: '20px 30px',
		fontSize: '14px',
		borderBottomRightRadius: '5px',
		borderBottomLeftRadius: '5px',
		'& .details-title': {
			fontSize: '22px',
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
	const [year, setYear] = useState('');
	const classes = useStyles();
	const {
		overview,
		release_date,
		backdrop_path,
		title,
		name,
		original_title,
		vote_average,
	} = currentTitle;
	const movieRef = useRef();

	const getYear = useCallback((movie) => {
		let releaseAirDate;
		if (movie.release_date)
			releaseAirDate = Number(movie.release_date.substring(0, 4));
		else if (movie.first_air_date) {
			releaseAirDate = Number(movie.first_air_date.substring(0, 4));
		}
		setYear(releaseAirDate);
		return releaseAirDate;
	}, []);

	useEffect(() => {
		const movie = currentTitle;
		movieRef.current = backdrop_path;
		const { name, original_name, title, id } = movie;
		const getTrailer = async (title) => {
			const subject = `${title} trailer`;
			const dt = await searchYoutube(subject);
			const { status, data } = dt;
			if (status < 301) {
				const item = data.items[0].id.videoId;
				setTrailerUrl(item);
			} else {
				const year = getYear(movie);
				if (year) {
					movieTrailer(name|| title || original_name, { year, id: true })
						.then((url) => {				
							setTrailerUrl(url);
						})
						.catch((err) => console.log(err));
				}
			}
		};
		getTrailer(name || original_name || title);
		getYear(movie);
	}, [currentTitle, backdrop_path, getYear]);

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
								backdrop_path
									? img_base_url + backdrop_path
									: '/images/noPoster.jpg'
							}
							alt='poster'
							height='100%'
							width='100%'
						/>
						{trailerUrl && (
							<Play
								className={classes.modalPlay}
								onClick={() => handleTrailer()}
							/>
						)}
					</div>
					<div className={classes.details}>
						{!backdrop_path && (
							<div>
								<p>
									Title: <span>{noPosterTitle()}</span>
								</p>
							</div>
						)}
						<p className='details-title'>
							{title || name || original_title}&nbsp;({year})
						</p>
						<p>{overview || noDetailsMessage}</p>
						<p>
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
