import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import EditMovieDetails from "./EditMovieDetails";
const UserProfile = () => {
    const navigate = useNavigate();
    const userObj = {
        "Username": "",
        "EmailAddress": ""
    };
    
    const [loading, setLoading] = useState(false);
    const [userDetails, setUserDetails] = useState(userObj);
    
    let userName = userObj.Username;
    let emailAddress = userObj.EmailAddress;

    /*useEffect(() => {
        fetch(`/current_user`, {
            method: 'get',
                headers: new Headers({
                'Authorization': ////TOKEN!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            })})
            .then(res => res.json())
            .then(data => {
                setUserDetails({
                    "Username": data.username,
                    "EmailAddress": data.EmailAddress
                });
                setLoading(false);
            })}, [])*/

    if (loading)
        return <p className="loading"><em>Loading...</em></p>;
    
    return <div className="user-container">
            <div className="user-card">
                <img
                    src="https://lh3.googleusercontent.com/oUUiPB9sq3ACq4bUaRmo8pgvC4FUpRRrQKcGIBSOsafawZfRpF1vruFeYt6uCfL6wGDQyvOi6Ez9Bpf1Fb7APKjIyVsft7FLGR6QqdRFTiceNQBm1In9aZyrXp33cZi9pUNqjHASdA=s170-no"
                    alt="Person" className="card__image"/>
                    <p className="card__name">User Name</p>
                    <p className="email">Email@Address.com</p>
                    <ul className="social-icons">
                        <li><a href="/"><i className='fa fa-instagram'></i></a></li>
                        <li><a href="#"><i className='fa fa-twitter'></i></a></li>
                        <li><a href="#"><i className='fa fa-linkedin'></i></a></li>
                        <li><a href="#"><i className='fa fa-codepen'></i></a></li>
                    </ul>
            </div>
        </div>
}

export default UserProfile;