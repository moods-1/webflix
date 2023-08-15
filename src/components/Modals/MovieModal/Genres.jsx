import React, { useEffect, useState } from 'react';

import useStyles from './styles';
import { GENRES } from '../../../helpers/constants';

const Genres = ({ genres, color, background }) => {
	const [genreArr, setGenreArr] = useState([]);
	const classes = useStyles();
	const pillStyles = {
		color: color || '#000',
		backgroundColor: background || '#fff',
	};

	useEffect(() => {
		const arr = [];
		if (genres) {
			genres.forEach((g) => {
				if (g in GENRES) {
					arr.push(GENRES[g]);
				}
			});
			setGenreArr([...arr]);
		}
	}, [genres]);

	return (
		<div className={classes.genresMain}>
			{genreArr.map((g) => (
				<div key={g} className={classes.genrePill} style={pillStyles}>
					{g}
				</div>
			))}
		</div>
	);
};

export default Genres;
