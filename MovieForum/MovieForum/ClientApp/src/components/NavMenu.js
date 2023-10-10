import React, {useContext, useEffect, useState} from 'react';
import {Link, Outlet, useNavigate} from 'react-router-dom';
import './NavMenu.css';
import {LoginContext} from "../contexts/LoginContext";

const NavMenu = ({userObj, loggedIn, setLoggedIn, setUserObj}) => {
    
    const navigate = useNavigate();
    
    const logout = () => {
        fetch("/api/user/logout", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            }
        })    
            .then(() => {
                document.cookie.split(";")
                    .forEach(function(c) { 
                        document.cookie = c.replace(/^ +/, "")
                            .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
            })
            .then(() => navigate("/"))
            .then(() => {
               setLoggedIn(false);
            })
            .then(() => setUserObj(null));
    }
    
   
    
  console.log(userObj)
    
    return (
        <div>
            <header>
                <nav className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3">
                    <Link className="movie-forum-button" to="/">IMDb</Link>
                    <ul className="navbar-nav flex-grow">
                        {!loggedIn ?
                            <li>
                                <Link className={"text-dark"} to={"/login"}>Login</Link>
                            </li> 
                            :
                            <>
                            <li>
                                <Link className="text-dark" to="/add-new-movie">Add Movie</Link>
                            </li>
                                <li>
                               {<Link className={"text-dark"} to={`/user/${userObj.userName}`}>Profile</Link>}
                                </li>
                            <li>
                            <Link className={"text-dark"} onClick={() => logout()}>Logout</Link>
                             </li>
                            </>
                        }
                    </ul>
                </nav>
            </header>
            <Outlet />
        </div>
    );
}

export default NavMenu;
