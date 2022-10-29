import React, { useState, useEffect } from 'react';
import instance from '../../helpers/axios';
import { Button } from '@material-ui/core';
import BeatLoader from 'react-spinners/BeatLoader';
import MovieModal from '../Modals/MovieModal/MovieModal';
import './Row.css';

const img_base_url = 'https://image.tmdb.org/t/p/original';

const Row = ({ title, fetchURL, isLargeRow }) => {
	const [movies, setMovies] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [currentTitle, setCurrentTitle] = useState({});

	useEffect(() => {
		async function fetchData() {
			const request = await instance.get(fetchURL);
			setMovies(request.data.results.slice(0, 9));
			return request;
		}
		fetchData();
	}, [fetchURL]);

	const handleClick = (movie) => {
		setCurrentTitle(movie);
		setShowModal(true);
	};

	const truncate = (str, n) =>
		str?.length > n ? str.substr(0, n - 1) + '...' : str;

	return (
		<div className='row'>
			<h3 id='category-title'>{title}</h3>
			<div className='row-posters'>
				{movies.length < 7 && <BeatLoader color={'red'} />}
				{movies.map((movie) => (
					<div className='poster-box' key={movie.id}>
						<img
							className={`row-poster ${isLargeRow ? 'row-poster-large' : ''}`}
							src={
								img_base_url +
								(isLargeRow ? movie.poster_path : movie.backdrop_path)
							}
							alt={movie.name}
						/>
						<div className={`info-box ${!isLargeRow ? 'small-info-box' : ''}`}>
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
				))}
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
