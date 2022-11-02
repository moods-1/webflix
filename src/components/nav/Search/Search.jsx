import React, { useState, useEffect, useRef } from 'react';
import { Search, DeleteForeverOutlined } from '@material-ui/icons';
import instance from '../../../helpers/axios';
import { REQUESTS } from '../../../helpers/constants';
import MovieModal from '../../Modals/MovieModal/MovieModal';
import './Search.css';

function SearchInput({
	setShowNotifications,
	setShowBrowse,
	setShowProfileMenu,
	setHideMobileSearch,
	mobile,
	setHideInput,
}) {
	const inputRef = useRef();
	const [movies, setMovies] = useState([]);
	const [fil, setFil] = useState('');
	const [showModal, setShowModal] = useState(false);
	const [currentTitle, setCurrentTitle] = useState({});

	useEffect(() => {
		const getMovie = async () => {
			let response = await instance.get(REQUESTS.searchMovies + `${fil}`);
			if (response.data?.results) {
				let data = response.data.results;
				setMovies(data);
			}
		};
		fil && getMovie();
	}, [fil]);

	const handleInput = (e) => {
		const value = e.target.value.toLowerCase();
		if (!value) {
			setFil('');
			setMovies([]);
		} else {
			setFil(e.target.value.toLowerCase());
			setShowNotifications(false);
			setShowBrowse(false);
			setShowProfileMenu(false);
		}
	};

	const handleLeave = () => {
		setMovies([]);
	};

	const handleSubjectClick = (id) => {
		setCurrentTitle(movies.find((x) => x.id === id));
		setShowModal(true);
		setMovies([]);
	};
	const handleSearchClear = () => {
		inputRef.current.value = '';
		setMovies([]);
	};

	return (
		<>
			<div id={mobile ? 'mobile-search' : 'search-container'}>
				<div className='input-div' onMouseLeave={handleLeave}>
					<div className='input-group'>
						<input
							autoComplete='off'
							type='text'
							className='search-input'
							ref={inputRef}
							placeholder='Search content'
							onChange={handleInput}
						/>
						<div className='search-icon'>
							{inputRef.current?.value ? (
								<DeleteForeverOutlined
									onClick={handleSearchClear}
									fontSize='small'
									color=''
									role='button'
									style={{ color: 'red' }}
								/>
							) : (
								<Search />
							)}
						</div>
					</div>
					<ul className='search-list'>
						{movies.map(
							({ original_title, release_date, id }) =>
								release_date && (
									<li key={id} onClick={() => handleSubjectClick(id)}>
										{original_title}&nbsp;
										{release_date ? `(${release_date.substring(0, 4)})` : ''}
									</li>
								)
						)}
					</ul>
				</div>
			</div>
			{Object.keys(currentTitle).length > 0 && (
				<MovieModal
					showModal={showModal}
					setShowModal={setShowModal}
					currentTitle={currentTitle}
				/>
			)}
		</>
	);
}
export default SearchInput;
