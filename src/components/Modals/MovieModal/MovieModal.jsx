import React, { useState, useEffect, useRef, useCallback } from 'react';
import Play from '@material-ui/icons/PlayCircleOutline';
import movieTrailer from 'movie-trailer';
import { Modal, ModalBody } from 'reactstrap';

import TrailerModal from '../TrailerModal/TrailerModal';
import { searchYoutube } from '../../../helpers/helperFunctions';
import useStyles from './styles';
import Genres from './Genres';
// import { updateVideoTrailer } from '../../../api/video';

// const img_base_url = 'https://image.tmdb.org/t/p/original';

function MovieModal({ showModal, setShowModal, currentTitle }) {
	const [showTrailerModal, setShowTrailerModal] = useState(false);
	const [trailerUrl, setTrailerUrl] = useState('');
	const [year, setYear] = useState('');
	const classes = useStyles();
	const {
		overview,
		// releaseDate,
		backdropPath,
		title,
		name,
		originalTitle,
		voteAverage,
		genreIds,
		imageSrc,
		// id,
		trailerId,
	} = currentTitle;
	const movieRef = useRef();

	const getYear = useCallback((movie) => {
		let releaseAirDate;
		if (movie.releaseDate)
			releaseAirDate = Number(movie.releaseDate.substring(0, 4));
		else if (movie.firstAirDate) {
			releaseAirDate = Number(movie.firstAirDate.substring(0, 4));
		}
		setYear(releaseAirDate);
		return releaseAirDate;
	}, []);

	useEffect(() => {
		if (trailerId) {
			setTrailerUrl(trailerId);
		} else {
			const movie = currentTitle;
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
	}, [currentTitle, backdropPath, getYear]);

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
		if (!movieRef.current?.value === currentTitle.poster_path) {
			setTrailerUrl('');
		}
	};

	const noPosterTitle = () => {
		const { originalTitle, title, releaseDate: release } = currentTitle;
		let movieTitle = originalTitle ? originalTitle : title;
		let releaseDate = release.substring(0, 4);
		return `${movieTitle} (${releaseDate})`;
	};

	const noDetailsMessage = 'Sorry, there is no description for this title.';

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
							src={imageSrc || '/images/noPoster.jpg'}
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
