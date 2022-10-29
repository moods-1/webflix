import React from "react";
import Row from "./components/Row/Row";
import { REQUESTS } from "./helpers/constants";
import Banner from "./components/Banner/Banner";
import Nav from "./components/Nav/Nav";
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
        fetchURL={REQUESTS.fetchAnimatedMovies}
        isLargeRow
        mobile
      />
      <Row
        mobile
        title="NETFLIX Originals"
        fetchURL={REQUESTS.fetchNetflixOriginals}
      />
      <Row mobile title="Trending Now" fetchURL={REQUESTS.fetchTrending} />
      <Row mobile title="Top Rated" fetchURL={REQUESTS.fetchTopRated} />
      <Row mobile title="Action Movies" fetchURL={REQUESTS.fetchActionMovies} />
      <Row mobile title="Sci-Fi Movies" fetchURL={REQUESTS.fetchSciFiMovies} />
      <Row mobile title="Comedy Movies" fetchURL={REQUESTS.fetchComedyMovies} />
      <Row
        mobile
        title="Romance Movies"
        fetchURL={REQUESTS.fetchRomanceMovies}
      />
    </div>
  );
}
export default App;
