import React, { Component } from 'react';
export class MovieDetails extends Component {
    static displayName = MovieDetails.name;
    minimumYear = 1895;
    maximumYear = new Date().getFullYear();
    constructor(props) {
        super(props);
        const movieObj = {
            "Title": "",
            "ReleaseYear": 0,
            "Story": "",
            "Ratings": 0,
            "MovieImg": "",
            "Genre": ""
            
        }
        this.state = {movie: [], loading: true, editAllowed: false, movieDetails: movieObj, hasEmptySpace: false, img: null, file: File, isRated: false};
    }
    
    updateMovie(id){
        console.log("put:")
        console.log(this.state.movieDetails)
        fetch(`/movies/${id}`, {
            method: "put",
            body: JSON.stringify(this.state.movieDetails),
            headers: {
                "Content-type": "application/json",
                "Access-Control-Allow-Origin" : "*",
                "Access-Control-Allow-Credentials" : true
            }
        })//.then(e => this.componentDidMount())
    }

    
    async toggleEditFields(id) {
        if (this.state.editAllowed === true) {
            await this.setState({editAllowed: false})
            await console.log(this.state.movieDetails)
            await this.updateMovie(id);
        } else if (this.state.editAllowed !== true) {
            this.setState({editAllowed: true})
        }
    }
    

    componentDidMount() {
        const id = window.location.href.split('/')[3]
        this.populateMovieData(id);
    }
    
    deleteMovie(id) {
        fetch(`/movies/${id}`, {
            method: "delete"
        }).then(() => window.location.replace("/"))
    }
    
    async saveImage(id){
       let formData = new FormData();
       formData.append("file", this.state.file)
        
        const data = await fetch(`/movies/${id}/uploadimage`, {
            method:"post",
            body: formData
        })
    }
    
    changeImg(uploadedFile){
        let reader = new FileReader();
        this.setState({file: uploadedFile})
        reader.readAsDataURL(uploadedFile);
        reader.onload = () => {
            this.setState({img: reader.result})
        }
    }
    renderMovieDetails(movie) {
        
        const movieId = movie.id;
        let genres = this.state.genres;
        let movieTitle = this.state.movieDetails.Title;
        let movieRelease = this.state.movieDetails.ReleaseYear;
        let movieStory = this.state.movieDetails.Story;
        let movieImg = this.state.movieDetails.MovieImg;
        let movieGenre = this.state.movieDetails.Genre;
        let movieRatings = this.state.movieDetails.Ratings;
        const setObjValue = (setObject) => {this.setState(setObject)};
        const starRatings = (numberOfElement) => {
            let elements = [];
            
            for(let i = 0; i < numberOfElement; i++){
                let starId = `star${i}`
                elements.push(<><input type="radio" id={starId} name="rate" value={i}
                                     checked={movieRatings === i}
                                     onClick={e => toggleStars(i)}
                                     onChange={e => toggleStars(i)}/>
                <label htmlFor={starId} title="text">{i} stars</label></>)
            }
            return elements;
        }
        
        const toggleStars = (rateValue) => {
            setInputValue("Ratings", Number(rateValue))
            return rateValue;
        }
        const rateMovie = (id) => {
            this.updateMovie(id);
            this.setState({
                isRated: true
            })
        }
        
        const setInputValue = (key, value) => {
            setObjValue({movieDetails: {...this.state.movieDetails, [key]: value}})}
        
        return (
            <div>
                {this.state.editAllowed ? 
                    <div>
                        <input placeholder={"Please enter the correct title!"} 
                               type={"text"}
                               value={movieTitle} 
                               onChange={(e) => setInputValue("Title", e.target.value)}/>
                        {(!movieTitle.trim().length && this.state.hasEmptySpace) ? 
                            <small>Please enter the correct title!</small> 
                            : <></>}
                        <br/>
                        <input placeholder={"Please enter the correct release year!"} 
                               value={movieRelease}
                               onChange={e => setInputValue("ReleaseYear", Number(e.target.value))}/>
                            {(movieRelease > this.maximumYear ||
                                movieRelease < this.minimumYear) 
                                ? <small>Please enter the correct release year!</small> 
                                : <></>}
                        <br/>
                        <textarea placeholder={"Please enter the correct story of the movie!"} 
                            value={movieStory}
                                onChange={(e) => setInputValue("Story", e.target.value)}/>
                        <br/>
                        <div>Please choose the correct genre for this movie!</div>
                        <select onChange={(event) => setInputValue("Genre", event.target.value)}>
                            <option disabled selected hidden>Select a genre</option>
                        {genres.map((genre, index) => 
                            <option key={index} value={genre.name}>{genre.name}</option>
                        )}
                        </select>
                        <br/>
                        <p>Upload Image</p>
                        <form >
                            <img id="uploaded-image" src={this.state.img}/>
                            <br/>
                            <input id="upload-movie" type={"file"} onChange={(e) => this.changeImg(e.target.files[0])}/>
                            <button onClick={() => this.saveImage(movieId)}>Save image</button>
                        </form>
                        <br/><br/>
                        
                        <button onClick={event => this.toggleEditFields(movieId)}>Save movie informations</button><br/>
                        <button onClick={event => this.deleteMovie(movieId)}>Remove movie</button>
                    </div>
                    : 
                    <div className="movie-info-card">
                        <p className="movie-info">{movieTitle}</p>
                        <p className="movie-info">{movieRelease}</p>
                        <p className="movie-info">{movieGenre !== null ? movieGenre : ''}</p>
                        <p className="movie-info">{movieStory}</p>

                        <img className="movie-img" src={movieImg}/>
                        
                        <div className="rate"> Your rating of this movie:
                            <br/>
                            {starRatings(10).map(element => (element))}
                        </div>
                        <br/><br/><br/>
                        <button onClick={event => rateMovie(movieId)}>Rate movie</button><br/>
                        {this.state.isRated ? <p>Thank you for rating!</p> : <></>}
                        <br/><br/>
                        <button onClick={event => this.toggleEditFields()}>Edit movie informations</button>
                        
                    </div>}
            </div>
        );
    }
    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderMovieDetails(this.state.movie);

        return (
            <div>
                {contents}
            </div>
        );
    }

    async populateMovieData(id) {
        const movieResponse = await fetch(`/movies/${id}`);
        const movieData = await movieResponse.json();
        this.setState({movie: movieData, loading: false})
        this.setState({
            movieDetails: {
                "Title": movieData.title,
                "ReleaseYear": movieData.releaseYear,
                "Story": movieData.story,
                "Ratings": movieData.ratings,
                "Genre": movieData.genre,
                "MovieImg": movieData.movieImage
            }
        })
        
        const genreResponse = await fetch(`/api/genres`);
        const genreData = await genreResponse.json();
        this.setState({genres: genreData});
    }
}
