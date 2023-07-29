import React, { useRef, useState, useEffect } from 'react';
import { useMediaQuery } from '@material-ui/core';

import Row from './components/Row/Row';
import { ROWS } from './helpers/constants';
import Banner from './components/Banner/Banner';
import Nav from './components/Nav/Nav';
// import { Mixpanel } from './components/Mixpanel';
import './App.css';

const intersectionOptions = {
	root: null,
	rootMargin: '-150px 0px 0px 0px',
	threshold: 0.3,
};

function App() {
	const [intersectArr, setIntersectArr] = useState([
		'NETFLIX Originals',
		'Animated Movies',
	]);
	const [grabData, setGrabData] = useState([]);
	const mobile = useMediaQuery('(max-width: 640px)');
	const rowsRef = useRef([]);

	// Mixpanel.track('Webflix app accessed.', {
	// 	action: 'Webflix app accessed.',
	// });

	const intersectionCb = (entries) => {
		const [entry] = entries;
		let divTitle;
		if (entry.isIntersecting) {
			divTitle = entry.target.outerText;
		}
		divTitle && setIntersectArr((prevState) => [...prevState, divTitle]);
	};

	useEffect(() => {
		const obsever = new IntersectionObserver(
			intersectionCb,
			intersectionOptions
		);
		rowsRef.current?.forEach((row) => {
			obsever.observe(row);
		});
		return () => {
			rowsRef.current?.forEach((row) => obsever.unobserve(row));
		};
	}, []);

	useEffect(() => {
		setGrabData([...new Set([...intersectArr])]);
	}, [intersectArr]);

	return (
		<div className='App'>
			<div className='content-box'>
				<div id='desktop-box'>
					<h2>Desktop app only!</h2>
				</div>
				<Nav mobile={mobile} />
				<Banner mobile={mobile} />
				{ROWS.map(({ title, url, isLargeRow }, index) => (
					<div
						ref={(el) => {
							rowsRef.current[index] = el;
						}}
						key={title}
					>
						<Row
							title={title}
							fetchURL={url}
							mobile={mobile}
							isLargeRow={isLargeRow}
							grabData={grabData.includes(title)}
						/>
					</div>
				))}
			</div>
		</div>
	);
}
export default App;
