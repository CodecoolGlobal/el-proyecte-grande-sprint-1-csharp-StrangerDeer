import React from 'react';
import {Link, Outlet} from 'react-router-dom';
import './NavMenu.css';

const NavMenu = () => {
    return (
        <div>
            <header>
                <nav>
                    <ul className="navbar-nav flex-grow">
                        <li>
                            <Link className="movie-forum-button" to="/">MovieForum</Link>
                        </li>
                        <li>
                            <Link className="text-dark" to="/add-new-movie">Add Movie</Link>
                        </li>
                    </ul>
                </nav>
            </header>
            <Outlet />
        </div>
    );
}

export default NavMenu;
