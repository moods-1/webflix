import React, { useState, useEffect } from "react";
//import {requests} from '../requests';
import instance from "../axios";
import SearchIcon from "@material-ui/icons/Search";
import "../styles/nav/Search.css";

const API_KEY = "db6f15328c0fbe319f9c31ef6757d596";
function Input() {
  const [magnifier, setMagnifier] = useState(true);
  const [movies, setMovies] = useState([]);
  const [fil, setFil] = useState("");

  const movieFilter = (movies, fil) =>
    movies.filter((movie) => movie.title.toLowerCase().includes(fil));
  useEffect(() => {
    async function fetchData() {
      const request = await instance.get(
        `/discover/movie?api_key=${API_KEY}&with_genres=16`
      );
      console.log(request.data.results);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, []);

  return (
    <div className="search-main">
      <div id="search-container">
        {magnifier ? (
          <SearchIcon onClick={() => setMagnifier(false)} />
        ) : (
          <input
            type="text"
            id="search-box"
            placeholder="Search"
            onChange={(e) => setFil(e.target.value.toLowerCase())}
          />
        )}
      </div>
      {!magnifier && (
        <div className="filter-box" onMouseLeave={() => setMagnifier(true)}>
          {movieFilter(movies, fil).map((movie, index) => (
            <li key={index} onClick={() => setMagnifier(true)}>
              {movie.title}
            </li>
          ))}
        </div>
      )}
    </div>
  );
}
export default Input;
