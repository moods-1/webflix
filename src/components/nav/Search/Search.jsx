import React, { useState, useEffect, useRef } from 'react';
import { DeleteForeverOutlined, Search } from '@mui/icons-material';
import ClickOutsideHandler from '../../ClickOutsideHandler';
import instance from '../../../helpers/constants';
import { REQUESTS } from '../../../helpers/constants';
import MovieModal from '../../Modals/MovieModal/MovieModal';
import './Search.css';

function SearchInput({
	setShowNotifications,
	setShowBrowse,
	setShowProfileMenu,
	mobile,
}) {
	const inputRef = useRef();
	const [movies, setMovies] = useState([]);
	const [fil, setFil] = useState('');
	const [showModal, setShowModal] = useState(false);
	const [currentTitle, setCurrentTitle] = useState({});
	const showSearchList = movies.length > 0;

	useEffect(() => {
		const getMovie = async () => {
			let response = await instance.get(REQUESTS.searchMovies + `${fil}`);
			if (response.data?.results) {
				let data = response.data.results;
				setMovies(data);
			}
		};
		fil && getMovie();
		return () => {};
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
			<ClickOutsideHandler outsideFunction={handleSearchClear}>
				<div className={mobile ? 'mobile-search' : 'search-container'}>
					<div className='input-div'>
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
										role='button'
										style={{ color: 'red' }}
									/>
								) : (
									<Search />
								)}
							</div>
						</div>
						{showSearchList && (
							<ul className='search-list'>
								{movies.map(
									({ title, original_title, release_date, id }) =>
										release_date && (
											<li
												key={id}
												onClick={() => {
													handleSubjectClick(id);
													handleSearchClear();
												}}
											>
												{title || original_title}&nbsp;
												{release_date
													? `(${release_date.substring(0, 4)})`
													: ''}
											</li>
										)
								)}
							</ul>
						)}
					</div>
				</div>
			</ClickOutsideHandler>

			{Object.keys(currentTitle).length > 0 && (
				<MovieModal
					showModal={showModal}
					setShowModal={setShowModal}
					currentTitle={currentTitle}
					raw
				/>
			)}
		</>
	);
}
export default SearchInput;
