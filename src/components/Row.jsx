// rfce => created the functional component
// with the file title as the function name

import React, {useState, useEffect} from 'react';
import instance from '../axios';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import Play from '@material-ui/icons/PlayCircleOutline';
import Stop from '@material-ui/icons/StopOutlined';
import BeatLoader from 'react-spinners/BeatLoader';
import '../styles/Rows.css';

const img_base_url = "https://image.tmdb.org/t/p/original";
const Row = ({title, fetchURL, isLargeRow})=> {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");
    const [playStop, setPlayStop] = useState(true);
    
    const opts = {
        height: "390",
        width: "100%",
        playerVars:{
            autoplay: 1
        },  
    }

    useEffect(() => {
       async function fetchData() {
           const request = await instance.get(fetchURL);
           setMovies(request.data.results);
           return request;
       }
       fetchData();
    }, [fetchURL]);
    
    const handleClick = (movie,e) =>{
        let date = getYear(movie);
        playStop? setPlayStop(false):setPlayStop(true);
        if(trailerUrl) setTrailerUrl("");
        else{
            movieTrailer(movie.name || movie.title || movie?.original_name || "", date)
            .then(url =>{
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get("v"));
            })
            .catch( err=>{
                setPlayStop(true);
                console.log(err);
            })
        }
    }

    const getYear = movie =>{
        let releaseAirDate;
        if(movie.release_date) releaseAirDate= Number(movie.release_date.substr(0,4));
        else releaseAirDate = Number(movie.first_air_date.substr(0,4));
        return releaseAirDate;
    }
    
    const truncate = (str,n) => str?.length > n? str.substr(0, n-1) + "...":str;
    
    return (
        <div className="row">
            <h2 id="category-title">{title}</h2>
            <div className="row-posters">
            {movies.length < 7 && <BeatLoader 
                color={"red"}
            />}
            {movies.map(movie=>
                <div className="poster-box" key={movie.id}>
                    <img 
                        className={`row-poster ${isLargeRow && "row-poster-large"}`}
                        src={img_base_url + (isLargeRow ? movie.poster_path:movie.backdrop_path)}
                        alt={movie.name}
                    /> 
                    <div className="info-box">
                        <p>{truncate((movie.name || movie.title || movie?.original_name || ""),35)}</p>
                        { playStop?
                            <Play 
                                className="playStop-btn"
                                fontSize="large"
                                onClick={(e)=>handleClick(movie,e)}
                                style={{
                                    marginTop: isLargeRow? "60px":"10px"
                                }} />:
                            <Stop 
                                className="playStop-btn"
                                fontSize="large"
                                onClick={(e)=>handleClick(movie,e)}
                                style={{
                                    marginTop: isLargeRow? "60px":"10px"
                                }} />
                        }
                    </div>
                </div>          
            )}
        </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}
        </div>
    )
}
export default Row
