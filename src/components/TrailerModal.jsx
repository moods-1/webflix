import React from "react";
import { Modal, makeStyles } from "@material-ui/core";
import YouTube from "react-youtube";

const useStyles = makeStyles({
  closeBtn: {
    cursor: "pointer",
    position: "absolute",
    top: 15,
    right: 10,
    width: 20,
    color: "#FFF",
  },
  mainDiv: {
    padding: "20px 40px 0",
    background: "#000",
    color: "#FFF",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "600px",
    minWidth: 300,
    height: "50%",
    borderRadius: 5,
    boxShadow: "2px 2px 7px lightgray",
    "@media (max-width:640px)": {
        width: "95%",
      },
  },
});

function TrailerModal({ showTrailerModal, setShowTrailerModal, trailerUrl }) {
  const { closeBtn, mainDiv, trailerDiv } = useStyles();

  const opts = {
    width: "100%",
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
        style={{ color: "#000", padding: 20 }}
      >
        <div className={mainDiv}>
          <p className={closeBtn} onClick={handleClose}>
            X
          </p>
          <div className={trailerDiv}>
            <YouTube videoId={trailerUrl} opts={opts} />
          </div>
        </div>
      </Modal>
  );
}

export default TrailerModal;
