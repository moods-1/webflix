import React, { useState, useEffect } from 'react';
import Notifications from './Notifications/Notifications';
import { NOTIFICATIONS } from '../../helpers/constants';
import PersonIcon from '@material-ui/icons/Person';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
import { withStyles, useMediaQuery } from '@material-ui/core';
import Browse from '../Browse/Browse';
import Input from './Search/Search';
import './Nav.scss';

const StyledBadge = withStyles((theme) => ({
	badge: {
		fontSize: 12,
		top: 8,
		right: 0,
		width: 0,
		height: 'auto',
		background: 'red',
    padding: '1px 0px 1px',
	},
}))(Badge);

function Nav() {
	const [showBrowse, setShowBrowse] = useState(false);
	const [burgerMenu, setBurgerMenu] = useState(false);
	// const [mobile, setMobile] = useState(false);
	const [showProfileMenu, setShowProfileMenu] = useState(false);
	const [showNotifications, setShowNotifications] = useState(false);
	const [hideMobileSearch, setHideMobileSearch] = useState(true);
	const [hideInput, setHideInput] = useState(true);
	const [notifications, setNotifications] = useState(NOTIFICATIONS);
	const mobile = useMediaQuery('(max-width:640px)');
	

	useEffect(() => {
		setMobile(window.innerWidth < 640);
		setHideInput(window.innerWidth < 640);
	}, []);

	useEffect(() => {
		window.addEventListener('resize', () => {
			if (window.innerWidth > 640) {
				setBurgerMenu(false);
				setMobile(false);
				setHideMobileSearch(false);
				setHideInput(false);
			} else {
				setMobile(true);
				setHideMobileSearch(true);
				setHideInput(true);
			}
		});
		return () => window.removeEventListener('resize', () => true);
	}, []);

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
		<div className={`nav`}>
			<div id='logo-browse-box'>
				<img
					className='nav-logo'
					src='/images/webflix.png'
					alt='webflix-logo'
				/>
				<h4 onClick={handleBrowse}>Browse</h4>
				{showBrowse && (
					<Browse setShowBrowse={setShowBrowse} setBurgerMenu={setBurgerMenu} />
				)}
			</div>
			<div id='nav-right-box'>
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

				<div id='user-box'>
					<StyledBadge badgeContent={notifications.length} max={99}>
						<NotificationsIcon className='bell' onClick={handleNotifications} />
					</StyledBadge>
					<PersonIcon
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
				id='burger'
				onClick={handleBurger}
			/>
			{burgerMenu && (
				<div id='burger-menu-box' onMouseLeave={handleBurger}>
					<ul>
						<li onClick={handleBurgerSearch}>{!hideInput && 'Close'} Search</li>
						<li onClick={handleNotifications}>Notifications</li>
						<li onClick={handleBurger}>Logout</li>
					</ul>
				</div>
			)}
			{showProfileMenu && (
				<div id='burger-menu-box' onMouseLeave={handleProfile}>
					<ul>
						<li onClick={handleProfile}>Logout</li>
					</ul>
				</div>
			)}
			{showNotifications && notifications.length >= 1 && (
				<Notifications
					notifications={notifications}
					setNotifications={setNotifications}
					setShowNotifications={setShowNotifications}
				/>
			)}
		</div>
	);
}
export default Nav;
