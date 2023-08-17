import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import EditMovieDetails from "./EditMovieDetails";
const MovieDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const movieObj = {
            "Title": "",
            "ReleaseYear": 0,
            "Story": "",
            "Ratings": 0,
            "MovieImg": "",
            "Genre": "",
            "TrailerUrl": ""
        };
    
    const [movie, setMovie] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editAllowed, setEditAllowed] = useState(false);
    const [movieDetails, setMovieDetails] = useState(movieObj);
    const [isRated, setIsRated] = useState(false);

    let movieTitle = movieDetails.Title;
    let movieRelease = movieDetails.ReleaseYear;
    let movieStory = movieDetails.Story;
    let movieImg = movieDetails.MovieImg;
    let movieGenre = movieDetails.Genre;
    let movieRatings = movieDetails.Ratings;
    let movieTrailer = movieDetails.TrailerUrl;

    const setInputValue = (key, value) => {
        setMovieDetails({...movieDetails, [key]: value})
    }
    const toggleEditFields = (id) => {
        if (editAllowed === true) {
            setEditAllowed(false);
            updateMovie(id);
        } else if (editAllowed !== true) {
            setEditAllowed(true)
        }
    }
    const starRatings = (numberOfElement) => {
        let elements = [];
            
        for(let i = numberOfElement; i > 0; i--){
            let starId = `star${i}`
            elements.push(<React.Fragment key={starId}><input key={starId} type="radio" name="rate" value={i}
                                   checked={movieRatings === i} onChange={() => {toggleStars(i)}}
                                   />
                <label htmlFor={starId} title="text" 
                       onClick={() => {toggleStars(i)}}
                       onChange={() => {toggleStars(i)}}>{i} stars</label></React.Fragment>)
        }
        return elements;
    }
    const toggleStars = (rateValue) => {
        setInputValue("Ratings", Number(rateValue))
        return rateValue;
    }
    const rateMovie = (id) => {
        updateMovieRatings(id);
        setIsRated(true);
    }
    const updateMovieRatings = (id) => {
        fetch(`/movies/${id}`, {
            method: "put",
            body: JSON.stringify(movieDetails),
            headers: {
                "Content-type": "application/json",
            }
        });
    }
    const updateMovie = (id) => {
        fetch(`/movies/${id}`, {
            method: "put",
            body: JSON.stringify(movieDetails),
            headers: {
                "Content-type": "application/json",
            }
        }).then(() => {window.location.reload()})
    }
    
    useEffect(() => {
        fetch(`/movies/${id}`)
            .then(res => res.json())
            .then(data => {
                setMovie(data);
                setMovieDetails({
                    "Title": data.title,
                    "ReleaseYear": data.releaseYear,
                    "Story": data.story,
                    "Ratings": data.ratings,
                    "Genre": data.genre,
                    "MovieImg": data.movieImage,
                    "TrailerUrl": data.trailerUrl
                });
                setLoading(false);
            })}, [])

        if (loading)
            return <p className="loading"><em>Loading...</em></p>;

        return (
            <div>
                {editAllowed ? <EditMovieDetails movieDetails={movieDetails}
                                                 setMovieDetails={setMovieDetails}
                                                 updateMovie={updateMovie}
                                                 navigate={navigate}/>
                    :
                    <div className="movie-info-card">
                        <p className="movie-info" id="movie-title">{movieTitle}</p>
                        <p className="movie-info" id="movie-release">{movieRelease}</p>
                        <p className="movie-info" id="movie-genre">{movieGenre !== null ? movieGenre : ''}</p>
                        <p className="movie-info" id="movie-story">{movieStory}</p>

                        <img alt={id} className="movie-img" src={movieImg}/>

                        <div className="rate"> Your rating of this movie:
                            <br/>
                            {starRatings(10).map(element => (element))}
                        </div>
                        <br/><br/><br/>
                        <button onClick={event => rateMovie(id)}>Rate movie</button>
                        <br/>
                        {isRated ? <p style={{visibility: 'visible'}}>Thank you for rating!</p> :
                            <p style={{visibility: 'hidden'}}>Thank you for rating!</p>}
                        {(movieTrailer !== "") ? <div>
                            <iframe width="550" height="410" src={movieTrailer}></iframe>
                            <br/><br/></div> : <></>}
                        <button onClick={event => toggleEditFields()}>Edit movie informations</button>

                    </div>}
                <div className="shooting-stars">
                    <div className="shooting-star"></div>
                    <div className="shooting-star"></div>
                    <div className="shooting-star"></div>
                    <div className="shooting-star"></div>
                    <div className="shooting-star"></div>
                    <div className="shooting-star"></div>
                    <div className="shooting-star"></div>
                    <div className="shooting-star"></div>
                    <div className="shooting-star"></div>
                    <div className="shooting-star"></div>
                    <div className="shooting-star"></div>
                    <div className="shooting-star"></div>
                    <div className="shooting-star"></div>
                    <div className="shooting-star"></div>
                    <div className="shooting-star"></div>
                    <div className="shooting-star"></div>
                    <div className="shooting-star"></div>
                    <div className="shooting-star"></div>
                    <div className="shooting-star"></div>
                    <div className="shooting-star"></div>
                    <div className="shooting-star"></div>
                    <div className="shooting-star"></div>
                    <div className="shooting-star"></div>
                    <div className="shooting-star"></div>
                    <div className="shooting-star"></div>
                    <div className="shooting-star"></div>
                    <div className="shooting-star"></div>
                    <div className="shooting-star"></div>
                    <div className="shooting-star"></div>
                    <div className="shooting-star"></div>
                    <div className="shooting-star"></div>
                    <div className="shooting-star"></div>
                    <div className="shooting-star"></div>
                    <div className="shooting-star"></div>
                    <div className="shooting-star"></div>
                    <div className="shooting-star"></div>
                    <div className="shooting-star"></div>
                    <div className="shooting-star"></div>
                    <div className="shooting-star"></div>
                    <div className="shooting-star"></div>
                    <div className="shooting-star"></div>
                    <div className="shooting-star"></div>
                    <div className="shooting-star"></div>
                    <div className="shooting-star"></div>
                    <div className="shooting-star"></div>
                    <div className="shooting-star"></div>
                    <div className="shooting-star"></div>
                    <div className="shooting-star"></div>
                    <div className="shooting-star"></div>
                    <div className="shooting-star"></div>
                </div>

                <div className="shooting-stars2">
                    <div className="shooting-star2"></div>
                    <div className="shooting-star2"></div>
                    <div className="shooting-star2"></div>
                    <div className="shooting-star2"></div>
                    <div className="shooting-star2"></div>
                    <div className="shooting-star2"></div>
                    <div className="shooting-star2"></div>
                    <div className="shooting-star2"></div>
                    <div className="shooting-star2"></div>
                    <div className="shooting-star2"></div>
                    <div className="shooting-star2"></div>
                    <div className="shooting-star2"></div>
                    <div className="shooting-star2"></div>
                    <div className="shooting-star2"></div>
                    <div className="shooting-star2"></div>
                    <div className="shooting-star2"></div>
                    <div className="shooting-star2"></div>
                    <div className="shooting-star2"></div>
                    <div className="shooting-star2"></div>
                    <div className="shooting-star2"></div>
                    <div className="shooting-star2"></div>
                    <div className="shooting-star2"></div>
                    <div className="shooting-star2"></div>
                    <div className="shooting-star2"></div>
                    <div className="shooting-star2"></div>
                    <div className="shooting-star2"></div>
                    <div className="shooting-star2"></div>
                    <div className="shooting-star2"></div>
                    <div className="shooting-star2"></div>
                    <div className="shooting-star2"></div>
                    <div className="shooting-star2"></div>
                    <div className="shooting-star2"></div>
                    <div className="shooting-star2"></div>
                    <div className="shooting-star2"></div>
                    <div className="shooting-star2"></div>
                    <div className="shooting-star2"></div>
                    <div className="shooting-star2"></div>
                    <div className="shooting-star2"></div>
                    <div className="shooting-star2"></div>
                    <div className="shooting-star2"></div>
                    <div className="shooting-star2"></div>
                    <div className="shooting-star2"></div>
                    <div className="shooting-star2"></div>
                    <div className="shooting-star2"></div>
                    <div className="shooting-star2"></div>
                    <div className="shooting-star2"></div>
                    <div className="shooting-star2"></div>
                    <div className="shooting-star2"></div>
                    <div className="shooting-star2"></div>
                    <div className="shooting-star2"></div>
                    <div className="shooting-star2"></div>
                </div>
            </div>
        );
}
export default MovieDetails;
