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
            "Genre": ""
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
        }).then(/*() => {window.location.reload()}*/)
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
                    "Genres": data.genres,
                    "MovieImg": data.movieImage
                });
                setLoading(false)})
    }, [])
    
    if(loading)
        return <p className="loading"><em>Loading...</em></p>;
    
    console.log(movie)
        
    return (
        <div>
            {editAllowed ? <EditMovieDetails movieDetails={movieDetails} 
                                             setMovieDetails={setMovieDetails} 
                                             updateMovie={updateMovie}
                                            navigate={navigate}/>
                    : 
                    <div className="movie-info-card">
                        <p className="movie-info">{movieTitle}</p>
                        <p className="movie-info">{movieRelease}</p>
                        <p className="movie-info">{movieGenre !== null ? movieGenre : ''}</p>
                        <p className="movie-info">{movieStory}</p>

                        <img alt={id} className="movie-img" src={movieImg}/>
                        
                        <div className="rate"> Your rating of this movie:
                            <br/>
                            {starRatings(10).map(element => (element))}
                        </div>
                        <br/><br/><br/>
                        <button onClick={event => rateMovie(id)}>Rate movie</button><br/>
                        {isRated ? <p>Thank you for rating!</p> : <></>}
                        <br/><br/>
                        <button onClick={event => toggleEditFields()}>Edit movie informations</button>
                        
                    </div>}
            </div>
    );
}
export default MovieDetails;
