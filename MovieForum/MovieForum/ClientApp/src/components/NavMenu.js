import React, {useEffect, useState} from 'react';
import {Link, Outlet, useNavigate} from 'react-router-dom';
import './NavMenu.css';


const cookieStringToObj = (cookieString) => {
    let cookieEntries = cookieString.split(';');
    let result= {};
    
    for (const cookieEntry of cookieEntries) {
        let cookieKeyValuePair = cookieEntry.trim().split("=");
        
        result[cookieKeyValuePair[0]] = cookieKeyValuePair[1];
    }
    
    return result;
}
const NavMenu = () => {
    
    const navigate = useNavigate();
    
    const [userName, setUserName] = useState("");
    const logout = () => {
        fetch("/api/user/logout", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            }
        })    
            .then(() => {
                document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
            })
            .then(() => {
                navigate("/")
            })
    }
    
    useEffect(() => {

        const cookie = document.cookie;
        
        if(cookie.length !== 0){
            let cookieObjectum = cookieStringToObj(cookie);
            cookieObjectum["token"]
        }
        
    }, []);
    
    return (
        <div>
            <header>
                <nav className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3">
                    <Link className="movie-forum-button" to="/">IMDb</Link>
                    <ul className="navbar-nav flex-grow">
                        {cookie.length === 0 ?
                            <li>
                                <Link className={"text-dark"} to={"/login"}>Login</Link>
                            </li> 
                            :
                            <>
                            <li>
                                <Link className="text-dark" to="/add-new-movie">Add Movie</Link>
                            </li>
                                <li>
                                <Link className={"text-dark"} to={`/user/${userName}`}>Profile</Link>
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
