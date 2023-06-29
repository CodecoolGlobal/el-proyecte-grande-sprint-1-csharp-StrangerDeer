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
        console.log(movies[0])
        return (
            <div className="movies-display">
                {movies.map((movie, index) =>
                    <div className="movie-card" key={index} onClick={event => window.location.replace(`${movie.id}`)}>
                        <img src={movie.movieImage}/>
                        <div className="movie-titles">{movie.title}</div>
                        <div className="movie-release-year">{movie.releaseYear}</div>
                        <div className="movie-genre">{movie.genre !== null ? movie.genre : ''}</div>
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
