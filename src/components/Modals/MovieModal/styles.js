import { makeStyles } from '@material-ui/core';

export default makeStyles({
	modal: {
		color: '#fff',
		padding: '20px',
		'& .modal-content': {
			backgroundColor: 'transparent',
			width: 'auto',
		},
	},
	modalBody: {
		position: 'relative',
		boxShadow: '0px 0px 3px #ddd',
		padding: 0,
		width: '100%',
		maxWidth: '900px',
	},
	closeBtn: {
		cursor: 'pointer',
		position: 'absolute',
		display: 'grid',
		placeItems: 'center',
		top: 15,
		right: 15,
		width: 30,
		height: 30,
		borderRadius: '50%',
		color: '#FFF',
		zIndex: 100,
		fontSize: 16,
		background: 'rgba(0, 0, 0, 0.5)',
		'@media (max-width:600px)': {
			top: 5,
			right: 5,
		},
		'&:hover': {
			color: 'red',
		},
	},
	poster: {
		boxSizing: 'border-box',
		position: 'relative',
		width: '100%',
		height: '65%',
		textAlign: 'center',
		overflowX: 'hidden',
		'@media (max-height:800px)': {
			height: '60%',
			overflowY: 'auto',
		},
	},
	modalPlay: {
		borderRadius: '50%',
		background: 'rgba(9,9,9,0.2)',
		cursor: 'pointer',
		fontSize: 50,
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		'&:hover': {
			boxShadow: '0px 0px 8px red',
		},
	},
	details: {
		background: '#111',
		padding: '20px 30px',
		fontSize: '14px',
		borderBottomRightRadius: '5px',
		borderBottomLeftRadius: '5px',
		'& .details-title': {
			fontSize: '22px',
		},
	},
	overviewDetails: {
		height: 120,
		paddingRight: 7,
		overflowY: 'auto',
	},
	genresMain: {
		width: '100%',
		display: 'flex',
		flexWrap: 'wrap',
		gap: '10px',
		margin: '10px 0px',
		textShadow: 'none',
	},
	genrePill: {
		minWidth: '120px',
		fontSize: '13px',
		padding: '0px 10px',
		borderRadius: '15px',
		textAlign: 'center',
	},
});
