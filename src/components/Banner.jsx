import React,{useState, useEffect} from 'react';
import instance from '../axios';
import {requests} from '../requests';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import Play from '@material-ui/icons/PlayCircleOutline';
import Stop from '@material-ui/icons/StopOutlined';
import List from '@material-ui/icons/ListAlt';
import '../styles/Banner.css';

const img_base_url = "https://image.tmdb.org/t/p/original";

function Banner() {
    const [movie, setMovie] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");
    const [mobile, setMobile] = useState(true);
    const [playStop, setPlayStop] = useState(true);
    const opts = {
        height: "390",
        width: "100%",
        playerVars:{
            autoplay: 1
        },  
    }
    
    useEffect(()=>{
        const mobilizer = () => window.innerWidth > 500 && setMobile(false)
        mobilizer()
    },[]); 

    useEffect(()=>{
        window.addEventListener("resize",()=> setMobile(window.innerWidth < 500? true:false)) 
        return ()=> window.removeEventListener("resize")
    },[]);

    useEffect(() => {
        async function fetchData (){
            const request = await instance.get(requests.fetchNetflixOriginals);
            setMovie(request.data.results[
                Math.floor(Math.random() * request.data.results.length)
                ]);
            return request;
        }
        fetchData();
    },[]);
    const truncate = (str,n) => str?.length > n? str.substr(0, n-1) + "...":str;
    
    const handleClick = movie =>{
        if(trailerUrl) {
            playStop? setPlayStop(false):setPlayStop(true);
            setTrailerUrl("")
        }
        else{
            movieTrailer(movie.name || movie.title || movie?.original_name || "")
            .then(url =>{
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get("v"));
                playStop? setPlayStop(false):setPlayStop(true);
            })
            .catch( err=> console.log(err))    
        }
    }

    return (
        <div className="banner-container">
            <header 
                className="banner"
                style={{
                    backgroundSize: 'contain',
                    backgroundImage: `url(${!mobile? (img_base_url + '/'+ movie?.backdrop_path):(img_base_url + '/' + movie?.poster_path)})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center'
                    }}
            >
                <div className="banner-contents">
                    <h1 className="banner-title">
                            {movie?.title || movie?.name || movie?.original_name}
                    </h1>
                    <div className="banner-buttons">
                    { playStop?
                            <Play 
                                className="banner-button"
                                fontSize="large"
                                onClick={()=> handleClick(movie)}
                            />:
                            <Stop 
                                className="banner-button"
                                fontSize="large"
                                onClick={()=> handleClick(movie)}
                            />
                        }
                        <List 
                            className="banner-button"
                            id="banner-button-list"
                            fontSize="large"
                        />
                    </div>
                    <h1 className="banner-description">
                        {truncate(movie?.overview, 150)}
                    </h1>
                </div>
            </header>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}
            {!trailerUrl && 
            <div>
                <p
                    style={{
                        textAlign: 'center',
                        color: 'red'
                    }}
                >
                    Some titles may not have a trailer.
                </p>
            </div>}
        </div>
    )
}

export default Banner;
