import React from 'react';
import { DeleteForeverOutlined } from '@mui/icons-material';

import './UserNotifications.css';

function NotificationsContent({
	notifications,
	handleNotification,
}) {

	return (
		<div className='notifications'>			
				{notifications.map(({ id, message }, index) => (
					<div className='notification' key={index}>
						<DeleteForeverOutlined
							className='delete-icon'
							fontSize='small'
							color='error'
							onClick={() => handleNotification(id)}
						/>

						<div className='note-box'>
							<div>{index + 1}</div>
							<div className='note'>{message}</div>
						</div>
					</div>
				))}
		</div>
	);
}

export default NotificationsContent;
