import React, { useState, useEffect } from 'react';
import { MoreVert } from '@material-ui/icons';
import BeatLoader from 'react-spinners/BeatLoader';

import { getVideosByCategoryId } from '../../api/video';
import MovieModal from '../Modals/MovieModal/MovieModal';
import './Row.css';

const Row = ({ title, categoryId, mobile, grabData }) => {
	const [movies, setMovies] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [currentTitle, setCurrentTitle] = useState({});
	
	useEffect(() => {
		if (grabData) {
			async function fetchData() {
				
				const request = await getVideosByCategoryId(categoryId);
				const { status, response } = request;
				if (status < 400) {
					setMovies([...response]);
				}
				return request;
			}
			fetchData();
		}
	}, [mobile, grabData]);

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
					const { title, name, original_title, id, imageSrc } = movie;
					return (
						<div className='poster-box' key={id}>
							<div
								className='poster-top'
								style={{ backgroundImage: `url(${imageSrc})` }}
							>
								<div className='poster-more'>
									<MoreVert onClick={() => handleClick(movie)} />
								</div>
								<div className='poster-bottom'>
									<p className='poster-title'>
										{truncate(
											title || name || original_title || '',
											35
										)}
									</p>
								</div>
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
