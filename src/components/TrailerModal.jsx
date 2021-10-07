import React from "react";
import { Modal, makeStyles } from "@material-ui/core";
import YouTube from "react-youtube";

const useStyles = makeStyles({
  modal:{
    minHeight: "50vh",
    color: "#000", 
    padding: 20 ,
  },
  closeBtn: {
    cursor: "pointer",
    position: "absolute",
    top: 15,
    right: 10,
    width: 20,
    color: "#FFF",
  },
  mainDiv: {
    padding: "40px 40px",
    background: "#000",
    color: "#FFF",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "600px",
    minWidth: 300,
    minHeight: "60%",
    borderRadius: 5,
    boxShadow: "2px 2px 7px lightgray",
    "@media (max-width:640px)": {
      width: "95%",
    },
  },
  trailerDiv: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "95%",
    padding: 40,
  },
});

function TrailerModal({
  showTrailerModal,
  setShowTrailerModal,
  setTrailerUrl,
  trailerUrl,
}) {
  const { modal, closeBtn, mainDiv, trailerDiv } = useStyles();

  const opts = {
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClose = () => {
    setShowTrailerModal(false);
    setTrailerUrl("");
  };

  return (
    <Modal
      open={showTrailerModal}
      onClose={handleClose}
      className={modal}
      style={{}}
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
