import React, { Component } from 'react';
import {isVisible} from "bootstrap/js/src/util";

export class AddNewMovie extends Component {
  static displayName = AddNewMovie.name;
  thisYear = new Date().getFullYear();
  minimumYear = 1895;
  maximumYear = new Date().getFullYear();

  constructor(props) {
    super(props);
    const movieObj = {
      "Title": "",
      "ReleaseYear": this.thisYear,
      "Story": ""
    }
    this.state = { hasEmptySpace: false, inputs: movieObj };
  }
  
  async clickEvent(){
    
    if(!this.state.inputs.Story.trim().length){
     await this.setState({inputs: {...this.state.inputs, "Story": "This movie doesn't have story"}});
    }

    const movieObject = this.state.inputs;
    
    if(!movieObject.Title.trim().length || 
        Number(movieObject.ReleaseYear) > this.maximumYear ||
        Number(movieObject.ReleaseYear) < this.minimumYear){
      this.setState({hasEmptySpace: true})
    } else{
      this.saveMovie()
    }
    
  }
  
  saveMovie(){
    fetch('https://localhost:7211/add-new-movie', {
      method: "post",
      body: JSON.stringify(this.state.inputs),
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin" : "*",
        "Access-Control-Allow-Credentials" : true
      }
    }).then(() => window.location.replace("/"))
  }
  render() {
    const setObjValue = (setObject) => {this.setState(setObject)};
    const setInputValue = (key, value) => {setObjValue({inputs: {...this.state.inputs, [key]: value}})}
    let titleInput = this.state.inputs.Title;
    let yearInput = Number(this.state.inputs.ReleaseYear);
    let storyInput = this.state.inputs.Story;
    
    return (
      <div>
        <div>Movie Title</div>
          <input key={"title"} 
                 type={"text"} 
                 placeholder={"Title"}
                 value={titleInput} 
                 onChange={(e) => setInputValue("Title", e.target.value)}/>
        {!titleInput.trim().length && this.state.hasEmptySpace ? <small>Please fill this field</small> : <></>} 
        <br/>
        <div>Year</div>
        <input key={"year"}
            type={"number"} 
            min={this.minimumYear} 
            max={this.maximumYear} 
            step={1}
            value={yearInput} 
            onChange={(e) => setInputValue("ReleaseYear", Number(e.target.value))}/>
        {(yearInput > this.maximumYear || 
            yearInput < this.minimumYear) ? <small>Please add correct year</small> : <></>}
        <br/>
        <div>Story</div>
        <input
          type={"text"}
          placeholder={"Tell the movie's story."}
          value={storyInput}
          onChange={(e) =>setInputValue("Story", e.target.value)}/>
        <br/>
          <button onClick={() => this.clickEvent(titleInput)}>Save</button>
      </div>
    );
  }
}
