import React, {useEffect, useState} from 'react';
import Tilt from 'react-vanilla-tilt';
import {Link, useNavigate} from 'react-router-dom'
const Home = () => {
    
    const navigate = useNavigate();

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchMovie, setSearchMovie] = useState("");
    const [genres, setGenres] = useState(null);
    const [selectedGenre, setSelectedGenre] = useState("");
    
    useEffect(() =>{
        fetch('/movies')
            .then(req => req.json())
            .then(data => {setMovies(data)})

        fetch(`/api/genres`)
            .then(res => res.json())
            .then(data => {setGenres(data); setLoading(false)})
    }, [])
    
    function chooseRandomMovie() {
        const randomMovieIndex = Math.floor(Math.random() * (movies.length));
        const movieId = movies[randomMovieIndex].id;
        navigate(`/movie/${movieId}`);
    }
    
    if(loading)
        return <p className="loading"><em>Loading...</em></p>;
    
    let searchList = movies.filter(movie => movie.title.toLowerCase().includes(searchMovie.toLowerCase())).sort((a, b) => (a.dateOfCreation < b.dateOfCreation) ? 1 : -1)
    if (selectedGenre !== "") {
        let filteredList = movies.filter(movie => movie.genre === selectedGenre);
        searchList = filteredList.filter(movie => movie.title.toLowerCase().includes(searchMovie.toLowerCase())).sort((a, b) => (a.dateOfCreation < b.dateOfCreation) ? 1 : -1)
    }
    
    return (
        <>
            <div className="top-page">
                <div className="search-container">
                <input className="searchbox" placeholder={"Search for movie title"} value={searchMovie} onChange={(e) => setSearchMovie(e.target.value)}/>
                <select onChange={(event) => setSelectedGenre(event.target.value)}>
                    <option selected={true} disabled={true} hidden={true}>Filter by genres</option>
                    <option value={""}>Not specified</option>
                    {genres.map((genre, index) =>
                        <option key={index} value={genre.name}>{genre.name}</option>
                    )}
                </select>
                </div><br/>
                <button className="random-movie" onClick={event => chooseRandomMovie()}>Random Movie</button>
                <br/><br/>
            </div>
        <div className="movies-display">
            {movies.length === 0 ? <div>We don't have any movies :(</div> :
                searchList.length === 0 ? <div>We couldn't find what you are looking for</div> : 
                    searchList
                .map((movie, index) => 

                    <Link key={movie.id} to={`/movie/${movie.id}`} style={{ textDecoration: 'none' }}>
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
