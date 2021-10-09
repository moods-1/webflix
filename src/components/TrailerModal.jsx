import React from "react";
import { Modal, makeStyles } from "@material-ui/core";
import YouTube from "react-youtube";

const useStyles = makeStyles({
  closeBtn: {
    cursor: "pointer",
    position: "absolute",
    top: 15,
    right: 15,
    width: 20,
    color: "#FFF",
    fontSize: 20,
    zIndex: 100,
  },
  modal: {
    boxShadow: "0px 0px 7px red",
  },
  mainDiv: {
    padding: "60px 40px 40px",
    background: "#000",
    color: "#FFF",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "grid",
    placeItems: "center",
    width: "600px",
    minWidth: 300,
    minHeight: "50vh",
    borderRadius: 5,
    boxShadow: "0px 0px 7px red",
    "@media (max-width:800px)": {
      width: "90%",
    },
    "@media (max-height:600px)": {
      height: "97%",
      width: "97%",
    },
  },
  player: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    "@media (max-height:600px)": {
      height: "80%",
      width: "80%",
    },
  },
});

function TrailerModal({
  showTrailerModal,
  setShowTrailerModal,
  setTrailerUrl,
  trailerUrl,
}) {
  const { closeBtn, mainDiv, player, modal } = useStyles();
  const opts = {
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClose = () => {
    setShowTrailerModal(false);
  };

  return (
    <Modal open={showTrailerModal} onClose={handleClose} className={modal}>
      <div className={mainDiv}>
        <p className={closeBtn} onClick={handleClose}>
          X
        </p>
        <YouTube videoId={trailerUrl} opts={opts} className={player} />
      </div>
    </Modal>
  );
}

export default TrailerModal;
