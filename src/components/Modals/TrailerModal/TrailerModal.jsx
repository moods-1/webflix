import React from 'react';
import { Modal, ModalBody } from 'reactstrap';
import YouTube from 'react-youtube';

import useStyles from './styles';

function TrailerModal({ showTrailerModal, close, trailerUrl }) {
	const classes = useStyles();
	const opts = {
		playerVars: {
			autoplay: 1,
		},
	};

	return (
		<Modal
			isOpen={showTrailerModal}
			toggle={close}
			centered
			className={classes.modal}
			size='xl'
		>
			<ModalBody className={classes.modalBody}>
				<p className={classes.closeBtn} onClick={close}>
					X
				</p>
				<YouTube videoId={trailerUrl} opts={opts} className={classes.player} />
			</ModalBody>
		</Modal>
	);
}

export default TrailerModal;
