import React, { useState, useEffect } from "react";
import { Modal, makeStyles } from "@material-ui/core";
import Play from "@material-ui/icons/PlayCircleOutline";
import moment from "moment-timezone";
import movieTrailer from "movie-trailer";
import TrailerModal from "./TrailerModal";

const img_base_url = "https://image.tmdb.org/t/p/original";
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
    width: "28%",
    minWidth: 300,
    height: "90%",
    borderRadius: 5,
    boxShadow: "2px 2px 7px lightgray",
    "& p": {
      fontSize: 13,
    },
    "& span": {
      fontWeight: 500,
    },
    "@media (max-width:1400px)": {
      width: "35%",
    },
    "@media (max-width:1050px)": {
      width: "55%",
    },
    "@media (max-width:780px)": {
      width: "55%",
    },
    "@media (max-width:600px)": {
      width: "80%",
    },
  },
  poster: {
    position: "relative",
    width: "100%",
    height: "60%",
    margin: "20px auto 40px",
    "@media (max-width:400px)": {
      marginBottom: 0,
    },
  },
  modalPlay: {
    borderRadius: "50%",
    background: "rgba(9,9,9,0.2)",
    cursor: "pointer",
    fontSize: 50,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    "&:hover": {
      boxShadow: "0px 0px 8px green",
    },
  },
  overviewDetails: {
    height: 100,
    overflowY: "auto",
  },
});

function MovieModal({ showModal, setShowModal, currentTitle }) {
  const [showTrailerModal, setShowTrailerModal] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState("");
  const { closeBtn, mainDiv, poster, modalPlay, overviewDetails } = useStyles();
  const { overview, release_date, poster_path, vote_average } = currentTitle;

  const getYear = (movie) => {
    let releaseAirDate;
    if (movie.release_date)
      releaseAirDate = Number(movie.release_date.substr(0, 4));
    else releaseAirDate = Number(movie.first_air_date.substr(0, 4));
    return releaseAirDate;
  };

  useEffect(() => {
    let movie = currentTitle;
    let date = getYear(movie);
    movieTrailer(movie.name || movie.title || movie?.original_name || "", date)
      .then((url) => {
        const urlParams = new URLSearchParams(new URL(url).search);
        setTrailerUrl(urlParams.get("v"));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentTitle]);

  const handleTrailer = () => {
    setShowModal(false);
    setShowTrailerModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setTrailerUrl("");
  };

  return (
    <div>
      <Modal
        open={showModal}
        onClose={handleClose}
        style={{ color: "#000", padding: 20 }}
      >
        <div className={mainDiv}>
          <p className={closeBtn} onClick={handleClose}>
            X
          </p>
          <div
            className={poster}
            style={{
              background: `url(${
                poster_path
                  ? img_base_url + poster_path
                  : "/images/noPoster.jpg"
              }) no-repeat`,
              backgroundSize: "contain",
              backgroundPosition: "center",
            }}
          >
            {trailerUrl && (
              <Play className={modalPlay} onClick={() => handleTrailer()} />
            )}
          </div>
          <div>
            <p className={overview.length > 250 ? overviewDetails : ""}>
              {overview}
            </p>
            <p>
              <span>Release date: </span>
              {moment(release_date).format("DD-MMM-YY")}
              <br />
              <span>Rating: </span>
              {vote_average} / 10
            </p>
          </div>
        </div>
      </Modal>
      {showTrailerModal && (
        <TrailerModal
          showTrailerModal={showTrailerModal}
          setShowTrailerModal={setShowTrailerModal}
          setTrailerUrl={setTrailerUrl}
          trailerUrl={trailerUrl}
        />
      )}
    </div>
  );
}

export default MovieModal;
