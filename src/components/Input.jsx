import React, { useState, useEffect, useRef } from "react";
import instance from "../axios";
import { requests } from "../requests";
import "../styles/nav/Search.css";

function Input({
  showSearchList,
  setShowSearchList,
  setShowNotifications,
  setShowBrowse,
  setShowProfileMenu,
}) {
  const inputRef = useRef();

  const [movies, setMovies] = useState([]);
  const [fil, setFil] = useState("");

  const movieFilter = (movies, fil) =>
    movies.filter((movie) => movie.title.toLowerCase().includes(fil));

  const handleInput = (e) => {
    const value = e.target.value.toLowerCase();
    if (value === "") {
      setShowSearchList(false);
    } else {
      setFil(e.target.value.toLowerCase());
      setShowNotifications(false); 
      setShowBrowse(false);
      setShowProfileMenu(false);
      setShowSearchList(true);
    }
  };
  const handleLeave = () => {
    setShowSearchList(false);
    inputRef.current.value = "";
  };

  useEffect(() => {
    const url = requests.fetchAnimatedMovies;
    async function fetchData() {
      const request = await instance.get(url);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, []);

  return (
    <div className="search-main">
      <div id="search-container">
        <input
          type="text"
          id="search-box"
          ref={inputRef}
          placeholder="Search content"
          onChange={handleInput}
        />
      </div>
      {showSearchList && (
        <div className="filter-box" onMouseLeave={handleLeave}>
          {movieFilter(movies, fil).map((movie, index) => (
            <li key={index} onClick={() => setShowSearchList(false)}>
              {movie.title}
            </li>
          ))}
        </div>
      )}
    </div>
  );
}
export default Input;
