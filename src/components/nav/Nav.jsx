import React, { useState, useEffect } from 'react';

import Browse from '../Browse/Browse';
import Input from './Search/Search';
import './Nav.scss';
import UserNotifications from './Notifications/UserNotifications';
import Profile from './Profile/Profile';
import BurgerMenu from './BurgerMenu/BurgerMenu';

function Nav({ mobile }) {
	const [showBrowse, setShowBrowse] = useState(false);
	const [burgerMenu, setBurgerMenu] = useState(false);
	const [showProfileMenu, setShowProfileMenu] = useState(false);
	const [showNotifications, setShowNotifications] = useState(false);
	const [hideMobileSearch, setHideMobileSearch] = useState(true);
	const [hideInput, setHideInput] = useState(true);

	useEffect(() => {
		setHideInput(mobile);
		setHideMobileSearch(mobile);
		if (!mobile) {
			setBurgerMenu(mobile);
		}
	}, [mobile]);

	const handleBurger = () => {
		setBurgerMenu((prev) => !prev);
		setShowBrowse(false);
		setShowNotifications(false);
	};

	const handleBurgerSearch = () => {
		setHideInput((prev) => !prev);
		setBurgerMenu((prev) => !prev);
		setShowBrowse(false);
		setHideMobileSearch(!hideMobileSearch);
	};

	return (
		<div className='nav'>
			<div className='logo-browse-box'>
				<img
					className='nav-logo'
					src='/images/webflix.png'
					alt='webflix-logo'
				/>
				<Browse showMenu={showBrowse} setShowMenu={setShowBrowse} />
			</div>
			<div className='nav-right-box'>
				{!hideInput && (
					<Input
						setShowNotifications={setShowNotifications}
						setShowBrowse={setShowBrowse}
						setShowProfileMenu={setShowProfileMenu}
						setHideMobileSearch={setHideMobileSearch}
						mobile={mobile}
						setHideInput={setHideInput}
					/>
				)}
				<div className='user-box'>
					<UserNotifications
						showMenu={showNotifications}
						setShowMenu={setShowNotifications}
					/>
					<Profile
						showMenu={showProfileMenu}
						setShowMenu={setShowProfileMenu}
					/>
				</div>
			</div>
			<BurgerMenu
				showMenu={burgerMenu}
				setShowMenu={setBurgerMenu}
				hideInput={hideInput}
				handleBurgerSearch={handleBurgerSearch}
			/>
		</div>
	);
}
export default Nav;
