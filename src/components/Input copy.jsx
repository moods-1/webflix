import React, { useState, useEffect, useRef } from "react";
import instance from "../helpers/axios";
import { requests } from "../helpers/requests";
import MovieModal from "./MovieModal";
// import {DeleteOutline} from "@material-ui/icons"
import "../styles/nav/Search.css";

function Input({
  setShowNotifications,
  setShowBrowse,
  setShowProfileMenu,
  setHideMobileSearch,
  mobile,
  setHideInput,
}) {
  const inputRef = useRef();
  const [movies, setMovies] = useState([]);
  const [fil, setFil] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentTitle, setCurrentTitle] = useState({});

  useEffect(() => {
    const getMovie = async () => {
      let response = await instance.get(requests.searchMovies + `${fil}`);
      if (response.data?.results) {
        let data = response.data.results;
        setMovies(data);
      }
    };
    fil && getMovie();
  }, [fil]);

  const handleInput = (e) => {
    const value = e.target.value.toLowerCase();
    if (!value) {
      setFil("");
      setMovies([]);
    } else {
      setFil(e.target.value.toLowerCase());
      setShowNotifications(false);
      setShowBrowse(false);
      setShowProfileMenu(false);
    }
  };

  const handleLeave = () => {
    setMovies([]);
  };

  const handleSubjectClick = (id) => {
    setCurrentTitle(movies.find((x) => x.id === id));
    setShowModal(true);
    setMovies([]);
  };

  return (
    <>
      <div id={mobile ? "mobile-search" : "search-container"}>
        <div className="input-div" onMouseLeave={handleLeave}>
          <input
            autoComplete="off"
            autoFocus
            type="text"
            id="search-box"
            ref={inputRef}
            placeholder="Search content"
            onChange={handleInput}
          />
          <ul className="search-list" >
            {movies.map(({ original_title, release_date, id }) => (
              <li key={id} onClick={() => handleSubjectClick(id)}>
                {original_title}&nbsp;
                {release_date ? `(${release_date.substring(0, 4)})` : ""}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {Object.keys(currentTitle).length > 0 && (
        <MovieModal
          showModal={showModal}
          setShowModal={setShowModal}
          currentTitle={currentTitle}
        />
      )}
    </>
  );
}
export default Input;
