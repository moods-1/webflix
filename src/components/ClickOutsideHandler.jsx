import React, { useEffect, useRef } from 'react';

function ClickOutsideHandler(props) {
	const { outsideFunction, id } = props;
	const wrapperRef = useRef();

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
				outsideFunction && outsideFunction();
			}
		};
		document.addEventListener('click', handleClickOutside, true);
		return () =>
			document.removeEventListener('click', handleClickOutside, true);
	}, [outsideFunction]);
	return (
		<div id={id} style={{ display: 'relative' }} ref={wrapperRef}>
			{props.children}
		</div>
	);
}

export default ClickOutsideHandler;
