import React, { useState, useEffect, useRef } from "react";
import instance from "../axios";
import { requests } from "../requests";
import MovieModal from "./MovieModal";
import "../styles/nav/Search.css";

function Input({
  setShowNotifications,
  setShowBrowse,
  setShowProfileMenu,
  hideMobileSearch,
  setHideMobileSearch,
  mobile,
  setMobile,
}) {
  const inputRef = useRef();
  const [movies, setMovies] = useState([]);
  const [fil, setFil] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentTitle, setCurrentTitle] = useState({});

  useEffect(() => {
    async function getMovie() {
      let response = await instance.get(requests.searchMovies + `${fil}`);
      if (response.data?.results) {
        let data = response.data.results;
        setMovies(data);
      }
    }
    getMovie();
  }, [fil]);

  useEffect(() => {
    setHideMobileSearch((prevHideMobileSearch) => {
      if (prevHideMobileSearch === false) return true;
    });
  }, [setHideMobileSearch]);

  if (window.innerWidth > 520) {
    setMobile(false);
  } else {
    setMobile(true);
  }

  const handleInput = (e) => {
    const value = e.target.value.toLowerCase();
    if (!value) {
      setMovies([]);
    } else {
      setFil(e.target.value.toLowerCase());
      setShowNotifications(false);
      setShowBrowse(false);
      setShowProfileMenu(false);
    }
  };

  const handleLeave = () => {
    inputRef.current.value = "";
    setMovies([]);
    //setFil("");
  };

  const handleSubjectClick = (id) => {
    setCurrentTitle(movies.find((x) => x.id === id));
    setShowModal(true);
    setMovies([]);
    setHideMobileSearch(true);
    inputRef.current.value = "";
  };
  const handleSearchCloseBtn = () => {
    setFil("");
    inputRef.current.value = "";
    setMovies([]);
    setHideMobileSearch(true);
  };

  return (
    <>
      <div id={mobile ? "mobile-search" : "search-container"}>
        <ul
          className={`sList ${
            hideMobileSearch && window.innerWidth < 540 ? "hide" : ""
          }`}
          onMouseLeave={handleLeave}
        >
          <li id="searchListInput">
            <input
              autoComplete="off"
              type="text"
              id="search-box"
              ref={inputRef}
              placeholder="Search content"
              onChange={handleInput}
            />
            {!hideMobileSearch && window.innerWidth < 540 && (
              <p
                className="searchCloseBtn"
                onClick={() => handleSearchCloseBtn()}
              >
                <span>X</span>
              </p>
            )}
          </li>
          <div className="inputListDiv">
            {movies.map(({ original_title, id }) => (
              <li
                className="searchListItem"
                key={id}
                onClick={() => handleSubjectClick(id)}
              >
                {original_title}
              </li>
            ))}
          </div>
        </ul>
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
