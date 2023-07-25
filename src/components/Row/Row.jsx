import React, { useState, useEffect } from 'react';
import instance from '../../helpers/constants';
import { Button } from '@material-ui/core';
import BeatLoader from 'react-spinners/BeatLoader';
import MovieModal from '../Modals/MovieModal/MovieModal';
import DefaultBackdrop from '../../images/default-backdrop.jpg';
import DefaultPoster from '../../images/default-poster.jpg';
import './Row.css';

const img_base_url = 'https://image.tmdb.org/t/p/';

const Row = ({ title, fetchURL, isLargeRow, mobile, grabData }) => {
	const [movies, setMovies] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [currentTitle, setCurrentTitle] = useState({});

	useEffect(() => {
		if (grabData) {
			async function fetchData() {
				let films = [];
				const request = await instance.get(fetchURL);
				if (request.data.results) {
					films = request.data.results.slice(0, 10);
					const backdropSize = mobile ? 'w300' : 'w780';
					films.forEach((film) => {
						if (isLargeRow && film.poster_path) {
							film.imageSrc = img_base_url + `w185/${film.poster_path}`;
						} else if (!isLargeRow && film.backdrop_path) {
							film.imageSrc =
								img_base_url + `${backdropSize}/${film.backdrop_path}`;
						} else film.imageSrc = isLargeRow ? DefaultPoster : DefaultBackdrop;
					});
				}
				setMovies([...films]);
				return request;
			}
			fetchData();
		}
	}, [fetchURL, isLargeRow, mobile, grabData]);

	const handleClick = (movie) => {
		setCurrentTitle(movie);
		setShowModal(true);
	};

	const truncate = (str, n) =>
		str?.length > n ? str.substr(0, n - 1) + '...' : str;

	return (
		<div className='row'>
			<h3 className='category-title'>{title}</h3>
			<div className='row-posters'>
				{movies.length < 7 && <BeatLoader color={'red'} />}
				{movies.map((movie) => {
					return (
						<div className='poster-box' key={movie.id}>
							<img
								width='180px'
								className={`row-poster ${isLargeRow ? 'row-poster-large' : ''}`}
								src={movie.imageSrc}
								alt={movie.title || movie.original_name}
							/>
							<div
								className={`info-box ${!isLargeRow ? 'small-info-box' : ''}`}
							>
								{!isLargeRow && (
									<p>
										{truncate(
											movie.name || movie.title || movie?.original_name || '',
											35
										)}
									</p>
								)}
								<Button
									variant='contained'
									onClick={() => handleClick(movie)}
									style={{
										position: 'absolute',
										top: `${isLargeRow ? '50%' : '70%'}`,
										left: '50%',
										transform: 'translate(-50%,-50%)',
										color: '#FFF',
										background: 'rgba(0,0,0,0.7)',
										fontSize: 10,
									}}
								>
									Details
								</Button>
							</div>
						</div>
					);
				})}
			</div>
			{Object.keys(currentTitle).length > 0 && (
				<MovieModal
					showModal={showModal}
					setShowModal={setShowModal}
					currentTitle={currentTitle}
				/>
			)}
		</div>
	);
};
export default Row;
