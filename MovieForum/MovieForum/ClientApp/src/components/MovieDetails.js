import React, { Component } from 'react';

export class MovieDetails extends Component {
    static displayName = MovieDetails.name;
    constructor(props) {
        super(props);
        this.state = { movie: [], loading: true };
    }

    componentDidMount() {
        const id = window.location.href.split('/')[3]
        this.populateMovieData(id);
    }

    static renderMovieDetails(movie) {
        return (
            <div>
                <p>{movie.title}</p>
            </div>
        );
    }
    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : MovieDetails.renderMovieDetails(this.state.movie);

        return (
            <div>
                {contents}
            </div>
        );
    }

    async populateMovieData(id) {
        const response = await fetch(`https://localhost:7211/movies/${id}`);
        const data = await response.json();
        console.log(data);
        this.setState({ movie: data, loading: false });
    }
}
