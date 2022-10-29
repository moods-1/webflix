import React from 'react';
import './Notifications.css';
import { DeleteForeverOutlined } from '@material-ui/icons';

function Notifications({
	notifications,
	setNotifications,
	setShowNotifications,
}) {
	const handleNotification = (id) => {
		setNotifications((prevState) => prevState.filter((note) => note.id !== id));
	};

	return (
		<div
			className='notifications'
			onMouseLeave={() => setShowNotifications(false)}
		>
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

export default Notifications;
