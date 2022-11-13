import React from 'react';
import { Modal, makeStyles } from '@material-ui/core';
import YouTube from 'react-youtube';

const useStyles = makeStyles({
	closeBtn: {
		cursor: 'pointer',
		display: 'flex',
		justifyContent: 'end',
		color: '#FFF',
		fontSize: 16,
		zIndex: 100,
		marginBottom: 10,
		marginTop: '-20px',
		'&:hover': {
			color: '#F00',
		},
	},
	modal: {
		boxShadow: '0px 0px 7px red',
	},
	mainDiv: {
		padding: '40px',
		background: '#000',
		color: '#FFF',
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: '600px',
		minWidth: 300,
		minHeight: '50vh',
		borderRadius: 5,
		boxShadow: '0px 0px 7px red',
		'@media (max-width:800px)': {
			width: '90%',
		},
		'@media (max-height:600px)': {
			height: '97%',
			width: '97%',
		},
	},
	player: {
		width: '100%',
		'@media (max-height:600px)': {
			height: '80%',
			width: '80%',
		},
	},
});

function TrailerModal({
	showTrailerModal,
	setShowTrailerModal,
	setTrailerUrl,
	trailerUrl,
}) {
	const classes = useStyles();
	const opts = {
		playerVars: {
			autoplay: 1,
		},
	};

	const handleClose = () => {
		setShowTrailerModal(false);
	};

	return (
		<Modal
			open={showTrailerModal}
			onClose={handleClose}
			className={classes.modal}
		>
			<div className={classes.mainDiv}>
				<p className={classes.closeBtn} onClick={handleClose}>
					X
				</p>

				<YouTube videoId={trailerUrl} opts={opts} className={classes.player} />
			</div>
		</Modal>
	);
}

export default TrailerModal;
