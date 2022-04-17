import FacebookIcon from '@material-ui/icons/Facebook';
import { GitHub, Instagram, LinkedIn } from '@material-ui/icons';
import React from 'react';
import { NavLink } from 'react-router-dom';

const HeaderNav = () => {
    return (
        <nav style={{ background: '#2D2E32', color: '#fff' }} className="navbar navbar-dark navbar-expand-lg">
            <div className="container-fluid">
                <NavLink className="navbar-brand text-white" to='/'><small>Dev</small><strong>| KON</strong></NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse " id="navbarNav">
                    <ul className="navbar-nav  ms-auto">
                        <li className="nav-item m-2" style={{ fontSize: '16px' }}>
                            <NavLink className="nav-link text-white" activeStyle={{color: "#64F4AC"}} to="/home">Home</NavLink>
                        </li>
                        <li className="nav-item m-2" style={{ fontSize: '16px' }}>
                            <NavLink className="nav-link text-white" activeStyle={{color: "#64F4AC"}} to="/projects">Projects</NavLink>
                        </li>
                        <li className="nav-item m-2" style={{ fontSize: '16px' }}>
                            <NavLink className="nav-link text-white" activeStyle={{color: "#64F4AC"}} to="/blog">Blog</NavLink>
                        </li>
                        <li className="nav-item m-2" style={{ fontSize: '16px' }}>
                            <NavLink className="nav-link text-white" activeStyle={{color: "#64F4AC"}} to="/resume">Resume</NavLink>
                        </li>
                        <li className="nav-item m-2" style={{ fontSize: '16px' }}>
                            <NavLink className="nav-link text-white" activeStyle={{color: "#64F4AC"}} to="/about">About</NavLink>
                        </li>
                    </ul>
                </div>
                <div className="collapse navbar-collapse " id="navbarNav">
                    <ul className="navbar-nav  ms-auto">
                        <li className="nav-item m-3">
                            <NavLink href="https://www.linkedin.com/in/md-abdul-ahad-linkon-5988161b8/">
                                <LinkedIn style={{ color: '#fff', fontSize: '22px' }}></LinkedIn>
                            </NavLink>
                        </li>
                        <li className="nav-item m-3">
                            <NavLink href="https://github.com/linkon63">
                                <GitHub style={{ color: '#fff', fontSize: '22px' }}></GitHub>
                            </NavLink>
                        </li>
                        <li className="nav-item m-3">
                            <NavLink href="https://www.instagram.com/lin.kon.63/">
                                <Instagram style={{ color: '#fff', fontSize: '22px' }}></Instagram>
                            </NavLink>
                        </li>
                        <li className="nav-item m-3">
                            <NavLink href="https://www.facebook.com/lin.kon.63/">
                                <FacebookIcon style={{ color: '#fff', fontSize: '22px' }}></FacebookIcon>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};


export default HeaderNav;

                           


