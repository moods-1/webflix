import React from 'react';
import { Modal, makeStyles } from '@material-ui/core';
import YouTube from 'react-youtube';

const useStyles = makeStyles({
	closeBtn: {
		position: 'absolute',
		display: 'grid',
		placeItems: 'center',
		cursor: 'pointer',
		width: '30px',
		color: '#FFF',
		fontSize: 14,
		zIndex: 100,
		top: '30px',
		right: '5px',
		marginBottom: 10,
		marginTop: '-20px',
		'&:hover': {
			color: '#F00',
		},
	},
	modal: {
		boxShadow: '0px 0px 3px #ddd',
	},
	mainDiv: {
		position: 'relative',
		padding: '40px',
		background: '#000',
		color: '#FFF',
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: '90%',
		maxWidth: '900px',
		minWidth: 260,
		minHeight: '50vh',
		borderRadius: 5,
		boxShadow: '0px 0px 3px #ddd',
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

function TrailerModal({ showTrailerModal, close, trailerUrl }) {
	const classes = useStyles();
	const opts = {
		playerVars: {
			autoplay: 1,
		},
	};

	return (
		<Modal open={showTrailerModal} onClose={close} className={classes.modal}>
			<div className={classes.mainDiv}>
				<p className={classes.closeBtn} onClick={close}>
					X
				</p>

				<YouTube videoId={trailerUrl} opts={opts} className={classes.player} />
			</div>
		</Modal>
	);
}

export default TrailerModal;
