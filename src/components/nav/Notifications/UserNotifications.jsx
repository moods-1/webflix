import React, { useState } from 'react';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { Notifications } from '@mui/icons-material';

import NotificationsContent from './NotificationsContent';
import { USER_NOTIFICATIONS } from '../../../helpers/constants';
import ClickOutsideHandler from '../../ClickOutsideHandler';

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

export default function UserNotifications({ showMenu, setShowMenu }) {
	const [notificationsList, setNotificationsList] =
		useState(USER_NOTIFICATIONS);

	const handleNotification = (id) => {
		setNotificationsList((prevState) =>
			prevState.filter((note) => note.id !== id)
		);
	};

	const handleNotifications = () => {
		setShowMenu((prev) => !prev);
	};

	return (
		<ClickOutsideHandler outsideFunction={() => setShowMenu(false)}>
			<StyledBadge badgeContent={notificationsList.length} max={99}>
				<Notifications className='bell' onClick={handleNotifications} />
			</StyledBadge>
			{showMenu && notificationsList.length >= 1 && (
				<NotificationsContent
					notifications={notificationsList}
					handleNotification={handleNotification}
				/>
			)}
		</ClickOutsideHandler>
	);
}
