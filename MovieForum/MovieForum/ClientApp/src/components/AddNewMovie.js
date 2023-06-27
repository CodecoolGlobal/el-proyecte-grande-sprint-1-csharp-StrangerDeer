import React, { Component } from 'react';

export class AddNewMovie extends Component {
  static displayName = AddNewMovie.name;

  constructor(props) {
    super(props);
    this.state = { inputValue: "" };
    this.incrementCounter = this.incrementCounter.bind(this);
  }

  incrementCounter() {
    this.setState({
      currentCount: this.state.currentCount + 1
    });
  }
  
  render() {
    let inputValue = this.state.inputValue;
    
    return (
      <div>
        <div>Movie Title</div>
          <input type={"text"} 
                 placeholder={"Title"}
                 value={inputValue} 
                 onChange={(e) => this.setState({inputValue: e.target.value})}/>
        <br/>
          <button>Save</button>
      </div>
    );
  }
}
