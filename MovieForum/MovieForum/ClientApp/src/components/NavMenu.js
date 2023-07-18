import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import {Link, Outlet} from 'react-router-dom';
import './NavMenu.css';

const NavMenu = () => {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
          <Link className="movie-forum-button" to="/">MovieForum</Link>
            <ul className="navbar-nav flex-grow">
              <NavItem>
                <Link className="text-dark" to="/add-new-movie">Add Movie</Link>
              </NavItem>
            </ul>
        </Navbar>
        <Outlet />
      </header>
    );
}

export default NavMenu;
