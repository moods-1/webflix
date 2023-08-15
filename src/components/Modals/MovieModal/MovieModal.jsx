import React, { useState, useEffect, useRef, useCallback } from 'react';
import Play from '@mui/icons-material/PlayCircleOutline';
import movieTrailer from 'movie-trailer';
import { Modal, ModalBody } from 'reactstrap';

import TrailerModal from '../TrailerModal/TrailerModal';
import { searchYoutube } from '../../../helpers/helperFunctions';
import useStyles from './styles';
import Genres from './Genres';
// import { updateVideoTrailer } from '../../../api/video';

const img_base_url = 'https://image.tmdb.org/t/p/original';

function MovieModal({ showModal, setShowModal, currentTitle, raw }) {
	const [showTrailerModal, setShowTrailerModal] = useState(false);
	const [movie, setMovie] = useState({});
	const [movieImage, setMovieImage] = useState('');
	const [trailerUrl, setTrailerUrl] = useState('');
	const [year, setYear] = useState('');
	const classes = useStyles();
	const {
		overview,
		backdropPath,
		posterPath,
		title,
		name,
		originalTitle,
		voteAverage,
		genreIds,
		imageSrc,
		trailerId,
	} = movie;
	const movieRef = useRef();

	const getYear = useCallback((movie) => {
		let releaseAirDate;
		if (movie?.releaseDate)
			releaseAirDate = Number(movie.releaseDate.substring(0, 4));
		else if (movie?.firstAirDate) {
			releaseAirDate = Number(movie.firstAirDate.substring(0, 4));
		}
		setYear(releaseAirDate);
		return releaseAirDate;
	}, []);

	useEffect(() => {
		if (raw) {
			let editedMovie = { ...currentTitle };
			editedMovie.genreIds = editedMovie.genre_ids;
			editedMovie.backdropPath = editedMovie.backdrop_path;
			editedMovie.originalTitle = editedMovie.original_title;
			editedMovie.voteAverage = editedMovie.vote_average;
			editedMovie.firstAirDate = editedMovie.first_air_date;
			editedMovie.releaseDate = editedMovie.release_date;
			editedMovie.posterPath = editedMovie.poster_path;
			setMovie({ ...editedMovie });
		} else {
			setMovie(currentTitle);
		}
	}, [raw, currentTitle]);

	useEffect(() => {
		if (trailerId) {
			setTrailerUrl(trailerId);
		} else {
			movieRef.current = backdropPath;
			const { name, originalName, title } = movie;
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
						movieTrailer(name || title || originalName, { year, id: true })
							.then((url) => {
								setTrailerUrl(url);
							})
							.catch((err) => console.log(err));
					}
				}
			};
			getTrailer(name || originalName || title);
			getYear(movie);
		}
	}, [movie, backdropPath, getYear]);

	// Fetch trailer id and update the database
	// useEffect(() => {
	// 	const updateDB = async () => {
	// 		await updateVideoTrailer(id, trailerUrl);
	// 	}
	// 	trailerUrl && updateDB();
	// }, [trailerUrl]);

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
		if (!movieRef.current?.value === posterPath) {
			setTrailerUrl('');
		}
	};

	const noPosterTitle = () => {
		const { originalTitle, title, releaseDate: release } = movie;
		let movieTitle = originalTitle ? originalTitle : title;
		let releaseDate = release?.substring(0, 4);
		return `${movieTitle} (${releaseDate})`;
	};

	const noDetailsMessage = 'Sorry, there is no description for this title.';

	useEffect(() => {
		if (Object.keys(movie).length) {
			const movImg = imageSrc ? imageSrc : `${img_base_url}${backdropPath}`;
			setMovieImage(movImg);
		}
	}, [movie]);

	return (
		<>
			<Modal
				isOpen={showModal}
				toggle={handleClose}
				centered
				className={classes.modal}
				size='xl'
			>
				<ModalBody className={`${classes.modalBody}`}>
					<p className={classes.closeBtn} onClick={handleClose}>
						X
					</p>
					<div className={classes.poster}>
						<img
							src={movieImage || '/images/noPoster'}
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
						{!backdropPath && (
							<div>
								<p>
									Title: <span>{noPosterTitle()}</span>
								</p>
							</div>
						)}
						<p className='details-title'>
							{title || name || originalTitle}&nbsp;({year})
						</p>
						<p>{overview || noDetailsMessage}</p>
						<Genres genres={genreIds} color='#fff' background='#f00' />
						<p>
							<span>Rating: </span>
							{voteAverage} / 10
						</p>
					</div>
				</ModalBody>
			</Modal>
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
