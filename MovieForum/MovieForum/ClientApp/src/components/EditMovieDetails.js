﻿import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import ShootingStars from "./ShootingStars";

const EditMovieDetails = ({ movieDetails, setMovieDetails, updateMovie, navigate}) => {
    const {id} = useParams();
    let minimumYear = 1895;
    let maximumYear = new Date().getFullYear();

    const [hasEmptySpace, setHasEmptySpace] = useState(false);
    const [genres, setGenres] = useState(null);
    const [loading, setLoading] = useState(true);
    const [movieImg, setImg] = useState(null);
    const [file, setFile] = useState();

    let movieTitle = movieDetails.Title;
    let movieRelease = movieDetails.ReleaseYear;
    let movieStory = movieDetails.Story;
    let movieTrailerUrl = movieDetails.TrailerUrl;
    
    const saveImage = (event) => {
        event.preventDefault();
        
        let formData = new FormData();
        formData.append("file", file);
        
        fetch(`/api/movies/${id}/uploadimage`, {
            method: "post",
            body: formData,
            
        })
            .then(() => {window.location.reload()});
    }
    const changeImg = (uploadedFile) => {
        let reader = new FileReader();
        setFile(uploadedFile)
        reader.readAsDataURL(uploadedFile);
        reader.onload = () => {
            setImg(reader.result);
        }
    }
    const deleteMovie = (id) => {
        fetch(`/api/movies/${id}`, {
            method: "delete"
        }).then(() => navigate("/"))
    }
    const setInputValue = (key, value) => {
        setMovieDetails({...movieDetails, [key]: value})
    }

    const convertYouTubeUrl = (value) => {
        const videoSource = value.replace(/(?:^https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/g, "//www.youtube.com/embed/$1");
        setInputValue("TrailerUrl", videoSource)
    }
    
    useEffect(() => {
        fetch(`/api/genres`)
            .then(res => res.json())
            .then(data => {setGenres(data); setLoading(false)})
    }, [])
    
    if(loading)
        return <div className="loading">Loading...</div>
    
    return (<div className="edit-form">
        <input placeholder={"Please enter the correct title!"}
               type={"text"}
               value={movieTitle}
               onChange={(e) => setInputValue("Title", e.target.value)}/>
        {(!movieTitle.trim().length && hasEmptySpace) ?
            <small>Please enter the correct title!</small>
            : <></>}
        <br/>
        <input placeholder={"Please enter the correct release year!"}
               value={movieRelease}
               onChange={e => setInputValue("ReleaseYear", Number(e.target.value))}/>
        {(movieRelease > maximumYear ||
            movieRelease < minimumYear)
            ? <small>Please enter the correct release year!</small>
            : <></>}
        <br/>
        <textarea placeholder={"Please enter the correct story of the movie!"}
                  value={movieStory}
                  onChange={(e) => setInputValue("Story", e.target.value)}/>
        <br/>
        <div>Please choose the correct genre for this movie!</div>
        <select value={movieDetails.Genre !== null ? movieDetails.Genre : ""}
            onChange={(event) => setInputValue("Genre", event.target.value)}>
            <option hidden={true}>Select a genre</option>
            {genres.map((genre, index) =>
                <option key={index} value={genre.name}>{genre.name}</option>
            )}
        </select>
        <br/>
        <div>Movie Trailer</div>
        <input key={"trailer"}
               type={"text"}
               placeholder={"Trailer"}
               value={movieTrailerUrl}
               onChange={(e) => convertYouTubeUrl(e.target.value)}/>
        <br/>
        <p>Upload Image</p>
        <form>
            <img alt={id} id="uploaded-image" src={movieImg}/>
            <br/>
            <input id="upload-movie" type={"file"} onChange={(e) => changeImg(e.target.files[0])}/>
            <button onClick={(e) => saveImage(e)}>Save image</button>
        </form>
        <br/><br/>

        <div className="save-or-remove">
        <button className="grid-item" onClick={event => deleteMovie(id)}>Remove movie</button>
        <button className="grid-item" onClick={event => updateMovie(id)}>Save movie informations</button><br/>
        </div>
        <ShootingStars/>
    </div>)
}

export default EditMovieDetails;