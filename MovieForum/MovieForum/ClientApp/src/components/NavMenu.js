import React from 'react';
import {Link, Outlet} from 'react-router-dom';
import './NavMenu.css';

const NavMenu = () => {
    return (
        <div>
            <header>
                <nav className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3">
                    <Link className="movie-forum-button" to="/">IMDb</Link>
                    <ul className="navbar-nav flex-grow">
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
