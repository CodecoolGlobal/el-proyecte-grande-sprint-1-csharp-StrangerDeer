import React, {useEffect, useState} from 'react';
import Tilt from 'react-vanilla-tilt';
import {Link, useNavigate} from 'react-router-dom'
const Home = () => {
    
    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() =>{
        fetch('/movies')
            .then(req => req.json())
            .then(data => {setMovies(data); setLoading(false)})
    }, [])
    
    function chooseRandomMovie() {
        const randomMovieIndex = Math.floor(Math.random() * (movies.length));
        const movieId = movies[randomMovieIndex].id;
        navigate(`/movie/${movieId}`);
    }
    
    if(loading)
        return <p><em>Loading...</em></p>;
    
    return (<>
            <div className="top-page">
                <button onClick={event => chooseRandomMovie()}>Random Movie</button>
            </div>
        <div className="movies-display">
            {movies.map((movie, index) =>
                    <Link key={movie.id} to={`/movie/${movie.id}`}>
                    <Tilt key={movie.id} className="tilting-movie-card" options={{
                        perspective: 50,
                        scale: 2,
                        max: 400,
                        speed: 10,
                        glare: true,
                        'max-glare': 10,
                        easing:"cubic-bezier(.03,.98,.52.99)"}}
                    data-tilt-glare={true}
                    >
                        <div className="movie-card" key={index}>
                            <img alt={movie.id} className="movie-images" src={movie.movieImage}/>
                            <div className="movie-titles">{movie.title}</div>
                            <div className="movie-release-year">{movie.releaseYear}</div>
                            <div className="movie-genre">{movie.genre !== null ? movie.genre : ''}</div>
                        </div>
                    </Tilt>
                </Link>
                )}
            </div>
        </>
        );
}
export default Home;
