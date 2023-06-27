import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;
    constructor(props) {
        super(props);
        this.state = { movies: [], loading: true };
    }
    componentDidMount() {
        this.populateMovieData();
    }

    static renderMovieCards(movies) {
        return (
            <div>
                {movies.map((movie, index) =>
                    <div key={index} onClick={event => window.location.replace(`${movie.id}`)}>
                        <p>{movie.title} ({movie.releaseyear})</p>
                    </div>
                )}
            </div>
        );
    }
    render = () => {
      let contents = this.state.loading
          ? <p><em>Loading...</em></p>
          : Home.renderMovieCards(this.state.movies);
        
    return (
      <div>
          {contents}
      </div>
    );
  }

    async populateMovieData() {
        const response = await fetch('https://localhost:7211/movies');
        const data = await response.json();
        this.setState({ movies: data, loading: false });
    }
}
