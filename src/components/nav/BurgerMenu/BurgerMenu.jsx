import React from 'react';

import ClickOutsideHandler from '../../ClickOutsideHandler';

export default function BurgerMenu({
	showMenu,
	setShowMenu,
	hideInput,
	handleBurgerSearch,
}) {
	const handleBurger = () => {
		setShowMenu((prev) => !prev);
    };
    
	return (
		<div className='burger-div'>
			<ClickOutsideHandler outsideFunction={() => setShowMenu(false)}>
				<img
					src='/images/redBurger.png'
					alt='burger'
					className='burger'
					onClick={handleBurger}
				/>
				{showMenu && (
					<div className='burger-menu-box'>
						<ul>
							<li onClick={handleBurgerSearch}>
								{!hideInput && 'Close'} Search
							</li>
							<li onClick={handleBurger}>Logout</li>
						</ul>
					</div>
				)}
			</ClickOutsideHandler>
		</div>
	);
}
