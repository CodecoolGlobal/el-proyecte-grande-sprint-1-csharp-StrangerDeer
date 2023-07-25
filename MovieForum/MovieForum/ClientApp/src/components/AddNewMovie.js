import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";

const AddNewMovie = () =>{
  const navigate = useNavigate();
  
  let thisYear = new Date().getFullYear();
  let minimumYear = 1895;
  let maximumYear = new Date().getFullYear();
  const movieObj = {
    "Title": "",
    "ReleaseYear": thisYear,
    "Story": ""
    };
    
  const [hasEmptySpace, setHasEmptySpace] = useState(false);
  const [inputs, setInputs] = useState(movieObj);
  
  const clickEvent = () => {
    
    if(!inputs.Story.trim().length){
     setInputs({...inputs, "Story": "This movie doesn't have story"});
    }
    
    if(!inputs.Title.trim().length || 
        Number(inputs.ReleaseYear) > maximumYear ||
        Number(inputs.ReleaseYear) < minimumYear){
      setHasEmptySpace(true);
    } else{
      saveMovie()
    }
    
  }
  
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
  
  let titleInput = inputs.Title;
  let yearInput = Number(inputs.ReleaseYear);
  let storyInput = inputs.Story;
    
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
          <button onClick={() => clickEvent(titleInput)}>Save</button>
      </div>
    );
}

export default AddNewMovie;
