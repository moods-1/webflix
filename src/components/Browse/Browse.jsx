import React, { useState } from 'react';
import BrowseContent from './BrowseContent';

import ClickOutsideHandler from '../ClickOutsideHandler';

export default function Browse({ showMenu, setShowMenu }) {
	const handleBrowse = () => {
		setShowMenu((prev) => !prev);
	};

	return (
		<ClickOutsideHandler outsideFunction={() => setShowMenu(false)} id='browse'>
			<div className='nav-browse'>
				<span onClick={handleBrowse}>Browse</span>
				{showMenu && <BrowseContent handleBrowse={handleBrowse} />}
			</div>
		</ClickOutsideHandler>
	);
}
