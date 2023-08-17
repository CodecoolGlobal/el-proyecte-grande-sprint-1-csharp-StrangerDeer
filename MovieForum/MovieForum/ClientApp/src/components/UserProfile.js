import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import EditMovieDetails from "./EditMovieDetails";
const UserProfile = () => {
    const navigate = useNavigate();
    const { username } = useParams();
    
    const userObj = {
        "Username": "",
        "EmailAddress": "",
        "Badge": ""
    };
    
    const [loading, setLoading] = useState(false);
    const [userDetails, setUserDetails] = useState(userObj);
    
    

    useEffect(() => {
        fetch(`/api/user/current_user`)
            .then(res => res.json())
            .then(data => { 
                setUserDetails({
                    "Username": data.userName,
                    "EmailAddress": data.emailAddress,
                    "Badge": data.badge
                })})
            .then(() => setLoading(false))
                
            }, [])

    if (loading)
        return <p className="loading"><em>Loading...</em></p>;

    let userName = userDetails.Username;
    let emailAddress = userDetails.EmailAddress;
    let badge = userDetails.Badge;
    
    return <div className="user-container">
            <div className="user-card">
                <img
                    src="https://lh3.googleusercontent.com/oUUiPB9sq3ACq4bUaRmo8pgvC4FUpRRrQKcGIBSOsafawZfRpF1vruFeYt6uCfL6wGDQyvOi6Ez9Bpf1Fb7APKjIyVsft7FLGR6QqdRFTiceNQBm1In9aZyrXp33cZi9pUNqjHASdA=s170-no"
                    alt="Person" className="card__image"/>
                    <p className="card__name">{userName}</p>
                    <p className="email">{emailAddress}</p>
                    <p className="user-badge">{badge}</p>
                    <ul className="social-icons">
                        <li><a href="/"><i className='fa fa-instagram'></i></a></li>
                        <li><a href="#"><i className='fa fa-twitter'></i></a></li>
                        <li><a href="#"><i className='fa fa-linkedin'></i></a></li>
                        <li><a href="#"><i className='fa fa-codepen'></i></a></li>
                    </ul>
            </div>
        <div className="shooting-stars">
            <div className="shooting-star"></div>
            <div className="shooting-star"></div>
            <div className="shooting-star"></div>
            <div className="shooting-star"></div>
            <div className="shooting-star"></div>
            <div className="shooting-star"></div>
            <div className="shooting-star"></div>
            <div className="shooting-star"></div>
            <div className="shooting-star"></div>
            <div className="shooting-star"></div>
            <div className="shooting-star"></div>
            <div className="shooting-star"></div>
            <div className="shooting-star"></div>
            <div className="shooting-star"></div>
            <div className="shooting-star"></div>
            <div className="shooting-star"></div>
            <div className="shooting-star"></div>
            <div className="shooting-star"></div>
            <div className="shooting-star"></div>
            <div className="shooting-star"></div>
            <div className="shooting-star"></div>
            <div className="shooting-star"></div>
            <div className="shooting-star"></div>
            <div className="shooting-star"></div>
            <div className="shooting-star"></div>
            <div className="shooting-star"></div>
            <div className="shooting-star"></div>
            <div className="shooting-star"></div>
            <div className="shooting-star"></div>
            <div className="shooting-star"></div>
            <div className="shooting-star"></div>
            <div className="shooting-star"></div>
            <div className="shooting-star"></div>
            <div className="shooting-star"></div>
            <div className="shooting-star"></div>
            <div className="shooting-star"></div>
            <div className="shooting-star"></div>
            <div className="shooting-star"></div>
            <div className="shooting-star"></div>
            <div className="shooting-star"></div>
            <div className="shooting-star"></div>
            <div className="shooting-star"></div>
            <div className="shooting-star"></div>
            <div className="shooting-star"></div>
            <div className="shooting-star"></div>
            <div className="shooting-star"></div>
            <div className="shooting-star"></div>
            <div className="shooting-star"></div>
            <div className="shooting-star"></div>
            <div className="shooting-star"></div>
        </div>

        <div className="shooting-stars2">
            <div className="shooting-star2"></div>
            <div className="shooting-star2"></div>
            <div className="shooting-star2"></div>
            <div className="shooting-star2"></div>
            <div className="shooting-star2"></div>
            <div className="shooting-star2"></div>
            <div className="shooting-star2"></div>
            <div className="shooting-star2"></div>
            <div className="shooting-star2"></div>
            <div className="shooting-star2"></div>
            <div className="shooting-star2"></div>
            <div className="shooting-star2"></div>
            <div className="shooting-star2"></div>
            <div className="shooting-star2"></div>
            <div className="shooting-star2"></div>
            <div className="shooting-star2"></div>
            <div className="shooting-star2"></div>
            <div className="shooting-star2"></div>
            <div className="shooting-star2"></div>
            <div className="shooting-star2"></div>
            <div className="shooting-star2"></div>
            <div className="shooting-star2"></div>
            <div className="shooting-star2"></div>
            <div className="shooting-star2"></div>
            <div className="shooting-star2"></div>
            <div className="shooting-star2"></div>
            <div className="shooting-star2"></div>
            <div className="shooting-star2"></div>
            <div className="shooting-star2"></div>
            <div className="shooting-star2"></div>
            <div className="shooting-star2"></div>
            <div className="shooting-star2"></div>
            <div className="shooting-star2"></div>
            <div className="shooting-star2"></div>
            <div className="shooting-star2"></div>
            <div className="shooting-star2"></div>
            <div className="shooting-star2"></div>
            <div className="shooting-star2"></div>
            <div className="shooting-star2"></div>
            <div className="shooting-star2"></div>
            <div className="shooting-star2"></div>
            <div className="shooting-star2"></div>
            <div className="shooting-star2"></div>
            <div className="shooting-star2"></div>
            <div className="shooting-star2"></div>
            <div className="shooting-star2"></div>
            <div className="shooting-star2"></div>
            <div className="shooting-star2"></div>
            <div className="shooting-star2"></div>
            <div className="shooting-star2"></div>
            <div className="shooting-star2"></div>
        </div>
        </div>
}

export default UserProfile;