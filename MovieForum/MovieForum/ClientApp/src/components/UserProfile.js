import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import EditMovieDetails from "./EditMovieDetails";
import profilePicture from '../User/noimage.jpg';
import ShootingStars from "./ShootingStars";
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
                    src={profilePicture}
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
        <ShootingStars/>
        </div>
}

export default UserProfile;