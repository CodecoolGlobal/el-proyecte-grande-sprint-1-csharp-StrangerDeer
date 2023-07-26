import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";

const AddNewMovie = () =>{
  const navigate = useNavigate();
  
  let thisYear = new Date().getFullYear();
  let minimumYear = 1895;
  let maximumYear = new Date().getFullYear();
  const movieObj = {
    "Title": "",
    "ReleaseYear": thisYear,
    "Story": "", 
      "Genre": "",
      "TrailerUrl": ""
    };
    
  const [hasEmptySpace, setHasEmptySpace] = useState(false);
  const [genres, setGenres] = useState(null);
  const [inputs, setInputs] = useState(movieObj);
  const [loading, setLoading] = useState(true);
  
  const clickEvent = () => {
    
    if(!inputs.Story.trim().length){
     setInputs({...inputs, "Story": "No story specified"});
    }
    
    if(!inputs.Title.trim().length || 
        Number(inputs.ReleaseYear) > maximumYear ||
        Number(inputs.ReleaseYear) < minimumYear){
      setHasEmptySpace(true);
    } else{
      saveMovie()
    }
  }
  
    useEffect(() => {
        fetch(`/api/genres`)
            .then(res => res.json())
            .then(data => {setGenres(data); setLoading(false)})
    }, [])
  const saveMovie = () => {
    fetch('/add-new-movie', {
      method: "post",
      body: JSON.stringify(inputs),
      headers: {
        "Content-type": "application/json",
      }
    }).then(() => navigate("/"))
  }
  const setInputValue = (key, value) => {setInputs({...inputs, [key]: value})};
  const convertYouTubeUrl = (value) => {
      const videoSource = value.replace(/(?:^https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/g, "http://www.youtube.com/embed/$1");
      console.log(videoSource);
      setInputValue("TrailerUrl", videoSource)
  }
  
  let titleInput = inputs.Title;
  let yearInput = Number(inputs.ReleaseYear);
  let storyInput = inputs.Story;
  let genreInput = inputs.Genre;
  let trailerUrlInput = inputs.TrailerUrl;
    
  if (loading) {
      return <div className="loading">Loading...</div>
  }
  return (
      <div className="add-new-movie">
        <div>Movie Title</div>
          <input key={"title"} 
                 type={"text"} 
                 placeholder={"Title"}
                 value={titleInput} 
                 onChange={(e) => setInputValue("Title", e.target.value)}/>
        {!titleInput.trim().length && hasEmptySpace ? <small>Please fill this field</small> : <></>} 
        <br/>
        <div>Year</div>
        <input key={"year"}
            type={"number"} 
            min={minimumYear} 
            max={maximumYear} 
            step={1}
            value={yearInput} 
            onChange={(e) => setInputValue("ReleaseYear", Number(e.target.value))}/>
        {(yearInput > maximumYear || 
            yearInput < minimumYear) ? <small>Please add correct year</small> : <></>}
        <br/>
        <div>Story</div>
        <textarea
          type={"text"}
          placeholder={"Tell the movie's story."}
          value={storyInput}
          onChange={(e) =>setInputValue("Story", e.target.value)}/>
        <br/>
          <div>Please choose the correct genre for this movie!</div>
          <select value={inputs.Genre !== null ? inputs.Genre : ""}
                  onChange={(event) => setInputValue("Genre", event.target.value)}>
              <option>Select a genre</option>
              {genres.map((genre, index) =>
                  <option key={index} value={genre.name}>{genre.name}</option>
              )}
          </select>
          <br/>
          <div>Movie Trailer</div>
          <input key={"trailer"}
                 type={"text"}
                 placeholder={"Trailer"}
                 value={trailerUrlInput}
                 onChange={(e) => convertYouTubeUrl(e.target.value)}/>
          <br/><br/>
          <button onClick={() => clickEvent(trailerUrlInput)}>Save</button>
      </div>
    );
}

export default AddNewMovie;
