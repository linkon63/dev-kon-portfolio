import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import './Navbar.css';

const Navbar = () => {

    let activeStyle = {
        textDecoration: "none",
        color: "#64F4AC",
        fontSize: '16px',
        margin: "16px"
    };
    
    let unActiveStyle = {
        textDecoration: "none",
        color: "#fff",
        fontSize: '16px',
        margin: "16px"
    }
   

    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <div class="container-fluid">
                    <Link class="navbar-brand" to="/"><small>Dev</small><strong>| Kon</strong></Link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <NavLink
                                    style={({ isActive }) => isActive ? activeStyle : unActiveStyle}
                                    class="nav-link" to="/home"
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li class="nav-item">
                                <NavLink
                                    style={({ isActive }) => isActive ? activeStyle : unActiveStyle}
                                    class="nav-link" to="/about"
                                >
                                    About
                                </NavLink>
                            </li>
                            <li class="nav-item">
                                <NavLink
                                    style={({ isActive }) => isActive ? activeStyle : unActiveStyle}
                                    class="nav-link" to="/blog"
                                >
                                    Blog
                                </NavLink>
                            </li>
                            <li class="nav-item">
                                <NavLink
                                    style={({ isActive }) => isActive ? activeStyle : unActiveStyle}
                                    class="nav-link" to="/resume"
                                >
                                    Resume
                                </NavLink>
                            </li>
                            <li class="nav-item">
                                <NavLink
                                    style={({ isActive }) => isActive ? activeStyle : unActiveStyle}
                                    class="nav-link" to="/contact"
                                >
                                    Contact
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a
                                    class="nav-link"
                                    href='https://github.com/linkon63'
                                    target='_blank'
                                    rel="noopener noreferrer"
                                >
                                    <GitHubIcon></GitHubIcon>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a
                                    class="nav-link"
                                    href='https://www.linkedin.com/in/md-abdul-ahad-linkon-5988161b8/'
                                    target='_blank'
                                    rel="noopener noreferrer"
                                >
                                    <LinkedInIcon></LinkedInIcon>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a
                                    class="nav-link"
                                    href='https://www.instagram.com/accounts/login/?next=/lin.kon.63/'
                                    target='_blank'
                                    rel="noopener noreferrer"
                                >
                                    <InstagramIcon></InstagramIcon>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a
                                    class="nav-link"
                                    href='https://www.facebook.com/lin.kon.63/'
                                    target='_blank'
                                    rel="noopener noreferrer"
                                >
                                    <FacebookIcon></FacebookIcon>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;