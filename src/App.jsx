import React from "react";
import Row from "./components/Row";
import { requests } from "./requests";
import Banner from "./components/Banner";
import Nav from "./components/Nav";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div id="desktop-box">
        <h2>Desktop app only!</h2>
      </div>
      <Nav mobile />
      <Banner mobile />
      <Row
        title="Animated Movies"
        fetchURL={requests.fetchAnimatedMovies}
        isLargeRow
        mobile
      />
      <Row
        mobile
        title="NETFLIX Originals"
        fetchURL={requests.fetchNetflixOriginals}
      />
      <Row mobile title="Trending Now" fetchURL={requests.fetchTrending} />
      <Row mobile title="Top Rated" fetchURL={requests.fetchTopRated} />
      <Row mobile title="Action Movies" fetchURL={requests.fetchActionMovies} />
      <Row mobile title="Sci-Fi Movies" fetchURL={requests.fetchSciFiMovies} />
      <Row mobile title="Comedy Movies" fetchURL={requests.fetchComedyMovies} />
      <Row
        mobile
        title="Romance Movies"
        fetchURL={requests.fetchRomanceMovies}
      />
    </div>
  );
}
export default App;
