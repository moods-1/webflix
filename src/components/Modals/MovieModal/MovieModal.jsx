import React, { useState, useEffect, useRef, useCallback } from 'react';
import Play from '@material-ui/icons/PlayCircleOutline';
import movieTrailer from 'movie-trailer';
import { Modal, ModalBody } from 'reactstrap';

import TrailerModal from '../TrailerModal/TrailerModal';
import { searchYoutube } from '../../../helpers/helperFunctions';
import useStyles from './styles';
import Genres from './Genres';

const img_base_url = 'https://image.tmdb.org/t/p/original';

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
		genre_ids,
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
					movieTrailer(name || title || original_name, { year, id: true })
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
						<Genres genres={genre_ids} color='#fff' background='#f00' />
						<p>
							<span>Rating: </span>
							{vote_average} / 10
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
