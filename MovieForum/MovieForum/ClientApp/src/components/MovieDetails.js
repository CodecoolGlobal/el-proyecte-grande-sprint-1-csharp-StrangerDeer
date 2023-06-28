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
            "Ratings": 0
            
        }
        this.state = {movie: [], loading: true, editAllowed: false, movieDetails: movieObj, hasEmptySpace: false, img: null, file: File};
    }
    
    updateMovie(id){
        console.log(this.state.movieDetails)
        fetch(`https://localhost:7211/movies/${id}`, {
            method: "put",
            body: JSON.stringify(this.state.movieDetails),
            headers: {
                "Content-type": "application/json",
                "Access-Control-Allow-Origin" : "*",
                "Access-Control-Allow-Credentials" : true
            }
        }).then(e => this.componentDidMount())
    }
    
    toggleEditFields(id) {
        if (this.state.editAllowed === true) {
            this.setState({editAllowed: false})
            this.updateMovie(id);
        } else if (this.state.editAllowed !== true) {
            this.setState({editAllowed: true})
        }
    }

    componentDidMount() {
        const id = window.location.href.split('/')[3]
        this.populateMovieData(id);
    }
    
    deleteMovie(id) {
        fetch(`https://localhost:7211/movies/${id}`, {
            method: "delete"
        }).then(() => window.location.replace("/"))
    }
    
    async saveImage(id){
       let formData = new FormData();
       formData.append("file", this.state.file)
        
        const data = await fetch(`https://localhost:7211/movies/${id}/uploadimage`, {
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
        
        let movieTitle = this.state.movieDetails.Title;
        let movieRelease = this.state.movieDetails.ReleaseYear;
        let movieStory = this.state.movieDetails.Story;
        
        const setObjValue = (setObject) => {this.setState(setObject)};

        const toggleStars = (rateValue) => {
            setInputValue("Ratings", Number(rateValue))
        }
        const rateMovie = (id) => {
            this.updateMovie(id);
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
                        <input value={movieStory}
                                onChange={(e) => setInputValue("Story", e.target.value)}/>
                        <br/>
                        <p>Upload Image</p>
                        <form >
                            <img src={this.state.img}/>
                            <br/>
                            <input type={"file"} onChange={(e) => this.changeImg(e.target.files[0])}/>
                            <button onClick={() => this.saveImage(movieId)}>Save image</button>
                        </form>
                        <br/><br/>
                        
                        <button onClick={event => this.toggleEditFields(movieId)}>Save movie informations</button><br/>
                        <button onClick={event => this.deleteMovie(movieId)}>Remove movie</button>
                    </div>
                    : 
                    <div>
                        <p>{movieTitle}</p>
                        <p>{movieRelease}</p>
                        <p>{movieStory}</p>
                        <div className="rate">
                            <input type="radio" id="star5" name="rate" value="5"
                                   onClick={() => {toggleStars(5)}}/>
                            <label htmlFor="star5" title="text">5 stars</label>
                            <input type="radio" id="star4" name="rate" value="4"
                                   onClick={e => toggleStars(4)}/>
                            <label htmlFor="star4" title="text">4 stars</label>
                            <input type="radio" id="star3" name="rate" value="3"
                                   onClick={e => toggleStars(3)}/>
                            <label htmlFor="star3" title="text">3 stars</label>
                            <input type="radio" id="star2" name="rate" value="2"
                                   onClick={e => toggleStars(2)}/>
                            <label htmlFor="star2" title="text">2 stars</label>
                            <input type="radio" id="star1" name="rate" value="1"
                                   onClick={e => toggleStars(1)}/>
                            <label htmlFor="star1" title="text">1 star</label>
                        </div>
                        <br/><br/>
                        <button onClick={event => this.toggleEditFields()}>Edit movie informations</button>
                        <button onClick={event => rateMovie(movieId)}>Rate movie</button><br/>
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
        const response = await fetch(`https://localhost:7211/movies/${id}`);
        const data = await response.json();
        this.setState({movie: data, loading: false})
        this.setState({
            movieDetails: {
                "Title": data.title,
                "ReleaseYear": data.releaseYear,
                "Story": data.story,
                "Ratings": data.ratings
            }
        })
    }
}
