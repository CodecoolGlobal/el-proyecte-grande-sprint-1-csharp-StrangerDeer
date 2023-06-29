import React, { Component } from 'react';
import Tilt from 'react-vanilla-tilt';

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
            <div className="movies-display">
                {movies.map((movie, index) =>
                    <Tilt className="tilting-movie-card" options={{
                        perspective: 50,
                        scale: 2,
                        max: 400,
                        speed: 10,
                        glare: true,
                        "max-glare": 1,
                        easing:"cubic-bezier(.03,.98,.52.99)"}}
                    data-tilt-glare={true}
                    >
                        <div className="movie-card" key={index} onClick={event => window.location.replace(`${movie.id}`)}>
                            <div className="movie-titles">{movie.title}</div>
                            <div className="movie-release-year">{movie.releaseYear}</div>
                            <div className="movie-genre">{movie.genre !== null ? movie.genre : ''}</div>
                        </div>
                    </Tilt>
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
