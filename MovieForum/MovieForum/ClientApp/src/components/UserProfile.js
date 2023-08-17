import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import EditMovieDetails from "./EditMovieDetails";
import profilePicture from '../User/noimage.jpg';
const UserProfile = () => {
    const navigate = useNavigate();
    const userObj = {
        "Username": "",
        "EmailAddress": "",
        "Badge": ""
    };
    
    const [loading, setLoading] = useState(false);
    const [userDetails, setUserDetails] = useState(userObj);
    
    let userName = userObj.Username;
    let emailAddress = userObj.EmailAddress;
    let badge = userObj.Badge;

    /*useEffect(() => {
        fetch(`/current_user_data/${username}`, {
            method: 'get',
                headers: new Headers({
                'Authorization': ////TOKEN!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            })})
            .then(res => res.json())
            .then(data => {
                setUserDetails({
                    "Username": data.username,
                    "EmailAddress": data.EmailAddress,
                    "Badge": data.badge
                });
                setLoading(false);
            })}, [])*/

    if (loading)
        return <p className="loading"><em>Loading...</em></p>;
    
    return <div className="user-container">
            <div className="user-card">
                <img
                    src={profilePicture}
                    alt="Person" className="card__image"/>
                    <p className="card__name">User Name</p>
                    <p className="email">Email@Address.com</p>
                    <p className="user-badge">Badge</p>
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