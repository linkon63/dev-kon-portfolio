import React from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';

const Footer = () => {

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
        <div style={{ background: "#000", color: '#fff' }}>
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        <div className="d-flex flex-column justify-content-center align-items-center">
                        
                            <h2>Let's make something amazing toghtether.</h2>
                            <h4>Start by <span>saying hi</span></h4>
                       
                        </div>
                    </div>
                    <div className="col-md-4">
                        <span>Information</span>
                        <h6>Habiganj Sadar, Habiganj</h6>
                        <h3>hello@dev.com</h3>
                        <div class="" id="">
                        <ul class="navbar-nav ">
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
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3">
                        <Link class="navbar-brand text-white fs-2" to="/"><small>Dev</small><strong>| Kon</strong></Link>
                    </div>
                    <div className="col-md-5 d-flex align-items-center fs-5">
                        ©2022. All Rights Reserved
                    </div>
                    <div className="col-md-4">
                        <div class="" id="">
                            <ul style={{ listStyle: "none"}} class="d-flex align-items-center">
                                <li class="">
                                    <a
                                        class="nav-link text-white"
                                        href='https://github.com/linkon63'
                                        target='_blank'
                                        rel="noopener noreferrer"
                                    >
                                        <GitHubIcon></GitHubIcon>
                                    </a>
                                </li>
                                <li class="">
                                    <a
                                        class="nav-link text-white"
                                        href='https://www.linkedin.com/in/md-abdul-ahad-linkon-5988161b8/'
                                        target='_blank'
                                        rel="noopener noreferrer"
                                    >
                                        <LinkedInIcon></LinkedInIcon>
                                    </a>
                                </li>
                                <li class="">
                                    <a
                                        class="nav-link text-white"
                                        href='https://www.instagram.com/accounts/login/?next=/lin.kon.63/'
                                        target='_blank'
                                        rel="noopener noreferrer"
                                    >
                                        <InstagramIcon></InstagramIcon>
                                    </a>
                                </li>
                                <li class="">
                                    <a
                                        class="nav-link text-white"
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
                </div>
            </div>
        </div>
    );
};

export default Footer;