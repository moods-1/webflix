import { useState } from 'react';
import { Person } from '@mui/icons-material';
import ClickOutsideHandler from '../../ClickOutsideHandler';

export default function Profile({ showMenu, setShowMenu }) {
	const handleMenu = () => {
		setShowMenu((prev) => !prev);
	};
	return (
		<ClickOutsideHandler outsideFunction={() => setShowMenu(false)}>
			<Person
				onClick={handleMenu}
				style={{
					fontSize: 30,
					color: 'red',
					cursor: 'pointer',
				}}
			/>
			{showMenu && (
				<div className='burger-menu-box'>
					<ul>
						<li onClick={handleMenu}>Logout</li>
					</ul>
				</div>
			)}
		</ClickOutsideHandler>
	);
}
