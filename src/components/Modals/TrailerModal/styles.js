import { makeStyles } from '@material-ui/core';

export default makeStyles({
	modal: {
		color: '#fff',
		maxWidth: '900px',
		minWidth: '260px',
		'& .modal-content': {
			backgroundColor: '#000',
		},
	},
	modalBody: {
		position: 'relative',
		boxShadow: '0px 0px 3px #ddd',
		padding: 20,
		width: '100%',
		maxWidth: '900px',
		minWidth: '260px',
		minHeight: '50vh',
	},
	player: {
		width: '100%',
		minHeight: '50vh',
	},
	closeBtn: {
		position: 'absolute',
		display: 'grid',
		placeItems: 'center',
		cursor: 'pointer',
		width: '30px',
		color: '#FFF',
		fontSize: 14,
		zIndex: 100,
		top: '10px',
		right: '10px',
		'&:hover': {
			color: '#F00',
		},
	},
});
