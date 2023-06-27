﻿import React, { Component } from 'react';

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
                <p>{movie.releaseyear}</p>
            </div>
        );
    static deleteMovie(id) {
        fetch(`https://localhost:7211/movies/${id}`, {
            method: "delete"
        }).then(() => window.location.replace("/"))
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
    static renderMovieDetails(movie) {
        return (
            <div>
                <p>{movie.title}</p>
                <button onClick={event => this.deleteMovie(movie.id)}>Remove movie</button>
            </div>

    );
    }

    async populateMovieData(id) {
        const response = await fetch(`https://localhost:7211/movies/${id}`);
        const data = await response.json();
        this.setState({ movie: data, loading: false });
    }
}
