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
                
                <div className="rate">
                    <input type="radio" id="star5" name="rate" value="5"/>
                    <label htmlFor="star5" title="text">5 stars</label>
                    <input type="radio" id="star4" name="rate" value="4"/>
                    <label htmlFor="star4" title="text">4 stars</label>
                    <input type="radio" id="star3" name="rate" value="3"/>
                    <label htmlFor="star3" title="text">3 stars</label>
                    <input type="radio" id="star2" name="rate" value="2"/>
                    <label htmlFor="star2" title="text">2 stars</label>
                    <input type="radio" id="star1" name="rate" value="1"/>
                    <label htmlFor="star1" title="text">1 star</label>
                </div> 
                <br/><br/>
                <button onClick={event => this.deleteMovie(movie.id)}>Remove movie</button>
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
