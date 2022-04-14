import React, { useState, useEffect } from "react";
import instance from "../helpers/axios";
import { requests } from "../helpers/requests";
import movieTrailer from "movie-trailer";
import TrailerModal from "./TrailerModal";
import Play from "@material-ui/icons/PlayCircleOutline";
import "../styles/Banner.css";

const img_base_url = "https://image.tmdb.org/t/p/original";

function Banner() {
  const [movie, setMovie] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [showTrailerModal, setShowTrailerModal] = useState(false);
  const [mobile, setMobile] = useState(true);
  const [backgroundPath, setBackgroundPath] = useState("")

  useEffect(() => {
    setMobile(window.innerWidth < 640);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", () => setMobile(window.innerWidth < 640));
    return () => window.removeEventListener("resize", () => {});
  }, []);

  useEffect(() => {
    async function fetchData() {
      const request = await instance.get(requests.fetchSciFiMovies);
      let currentTitle =
        request.data.results[
          Math.floor(Math.random() * request.data.results.length)
        ];
      setMovie(currentTitle);
      return request;
    }
    fetchData();
  }, []);

  const truncate = (str, n) =>
    str?.length > n ? str.substr(0, n - 1) + "..." : str;

  const getYear = (movie) => {
    let releaseAirDate;
    if (movie.release_date)
      releaseAirDate = Number(movie?.release_date?.substr(0, 4));
    else releaseAirDate = Number(movie?.first_air_date?.substr(0, 4));
    return releaseAirDate;
  };

  useEffect(() => {
    let date = getYear(movie);
    if (date) {
      movieTrailer(
        movie?.name || movie?.original_name || movie?.title || "",
        date
      )
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((err) => console.log(err));
    }
  }, [movie]);

  useEffect(()=>{
    let path="";
    if(movie?.poster_path && mobile){
      path = img_base_url + "/" + movie?.poster_path
    }else if(movie?.backdrop_path && !mobile){
      path = img_base_url + "/" + movie?.backdrop_path
    }
    setBackgroundPath(path)
  },[mobile, movie?.backdrop_path, movie?.poster_path])
  
  return (
    <div className="banner-container">
      <header
        className="banner"
        style={{
          backgroundSize: "contain",
          backgroundImage: `url(${backgroundPath})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        {trailerUrl && showTrailerModal && (
          <TrailerModal
            showTrailerModal={showTrailerModal}
            setShowTrailerModal={setShowTrailerModal}
            trailerUrl={trailerUrl}
          />
        )}
        <div className="banner-contents">
          <h1 className="banner-title">
            {movie?.title || movie?.name || movie?.original_name}
          </h1>
          <p className="banner-description">{truncate(movie?.overview, 150)}</p>
          {trailerUrl && (
            <Play
              className="banner-button"
              fontSize="large"
              onClick={() => setShowTrailerModal(true)}
            />
          )}
        </div>
      </header>
      <p className="trailer-message">Some titles may not have a trailer.</p>
    </div>
  );
}

export default Banner;
