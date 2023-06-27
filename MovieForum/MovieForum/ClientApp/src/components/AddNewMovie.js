import React, { Component } from 'react';
import {isVisible} from "bootstrap/js/src/util";

export class AddNewMovie extends Component {
  static displayName = AddNewMovie.name;

  constructor(props) {
    super(props);
    this.state = { hasEmptySpace: false, titleInput: "" };
  }
  
  clickEvent(title){
    
    if(!title.trim().length){
      this.setState({hasEmptySpace: true})
    } else{
      this.saveMovie(title)
    }
    
  }
  
  saveMovie(title){
    const body = {
      "Title": title
    }
    
    fetch('https://localhost:7211/add-new-movie', {
      method: "post",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin" : "*",
        "Access-Control-Allow-Credentials" : true
      }
    }).then(() => window.location.replace("/"))
  }
  render() {
    let titleInput = this.state.titleInput;
    
    return (
      <div>
        <div>Movie Title</div>
          <input type={"text"} 
                 placeholder={"Title"}
                 value={titleInput} 
                 onChange={(e) => this.setState({titleInput: e.target.value})}/>
        {!titleInput.trim().length && this.state.hasEmptySpace ? <small>Please fill this field</small> : <></>} 
        <br/>
          <button onClick={() => this.clickEvent(titleInput)}>Save</button>
      </div>
    );
  }
}
