import React, { useState, useEffect } from 'react';
import { Notifications, Person } from '@mui/icons-material';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';

import UserNotifications from './Notifications/UserNotifications';
import { USER_NOTIFICATIONS } from '../../helpers/constants';
import Browse from '../Browse/Browse';
import Input from './Search/Search';
import './Nav.scss';
import ClickOutsideHandler from '../ClickOutsideHandler';

const StyledBadge = styled(Badge)((theme) => ({
	'& .MuiBadge-badge': {
		fontSize: 11,
		top: 9,
		right: 0,
		minHeight: '10px !important',
		height: 18,
		minWidth: '10px !important',
		width: 18,
		background: 'red',
		padding: '1px 0px 2px',
	},
}));

function Nav({ mobile }) {
	const [showBrowse, setShowBrowse] = useState(false);
	const [burgerMenu, setBurgerMenu] = useState(false);
	const [showProfileMenu, setShowProfileMenu] = useState(false);
	const [showNotifications, setShowNotifications] = useState(false);
	const [hideMobileSearch, setHideMobileSearch] = useState(true);
	const [hideInput, setHideInput] = useState(true);
	const [notificationsList, setNotificationsList] =
		useState(USER_NOTIFICATIONS);

	useEffect(() => {
		setHideInput(mobile);
		setHideMobileSearch(mobile);
		if (!mobile) {
			setBurgerMenu(mobile);
		}
	}, [mobile]);

	const handleBurger = () => {
		setBurgerMenu(!burgerMenu);
		setShowBrowse(false);
		setShowNotifications(false);
	};

	const handleBurgerSearch = () => {
		setHideInput(!hideInput);
		setBurgerMenu(!burgerMenu);
		setShowBrowse(false);
		setHideMobileSearch(!hideMobileSearch);
	};

	const handleProfile = () => {
		setShowProfileMenu(!showProfileMenu);
		setShowBrowse(false);
		setShowNotifications(false);
	};

	const handleNotifications = () => {
		setShowNotifications(!showNotifications);
		setShowBrowse(false);
		setShowProfileMenu(false);
		setBurgerMenu(false);
		setHideInput(mobile);
	};

	const handleBrowse = () => {
		setShowBrowse(!showBrowse);
		setBurgerMenu(false);
		setHideMobileSearch(true);
	};

	return (
		<div className='nav'>
			<div className='logo-browse-box'>
				<img
					className='nav-logo'
					src='/images/webflix.png'
					alt='webflix-logo'
				/>
				<p className='nav-browse' onClick={handleBrowse}>Browse</p>
				{showBrowse && (
					<Browse setShowBrowse={setShowBrowse} setBurgerMenu={setBurgerMenu} />
				)}
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
					<StyledBadge badgeContent={notificationsList.length} max={99}>
						<Notifications className='bell' onClick={handleNotifications} />
					</StyledBadge>
					<Person
						onClick={handleProfile}
						style={{
							fontSize: 30,
							color: 'red',
							cursor: 'pointer',
						}}
					/>
				</div>
			</div>
			<img
				src='/images/redBurger.png'
				alt='burger'
				className='burger'
				onClick={handleBurger}
			/>
			{burgerMenu && (
				<ClickOutsideHandler outsideFunction={handleBurger}>
					<div className='burger-menu-box'>
						<ul>
							<li onClick={handleBurgerSearch}>
								{!hideInput && 'Close'} Search
							</li>
							<li onClick={handleNotifications}>Notifications</li>
							<li onClick={handleBurger}>Logout</li>
						</ul>
					</div>
				</ClickOutsideHandler>
			)}
			{showProfileMenu && (
				<div className='burger-menu-box'>
					<ClickOutsideHandler outsideFunction={handleProfile}>
						<ul>
							<li onClick={handleProfile}>Logout</li>
						</ul>
					</ClickOutsideHandler>
				</div>
			)}
			{showNotifications && notificationsList.length >= 1 && (
				<UserNotifications
					notifications={notificationsList}
					setNotifications={setNotificationsList}
					setShowNotifications={setShowNotifications}
				/>
			)}
		</div>
	);
}
export default Nav;
