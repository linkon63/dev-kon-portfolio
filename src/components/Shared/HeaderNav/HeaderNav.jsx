import { Book, CloudDownload, DeveloperMode, EmojiPeople, Group, Home } from '@material-ui/icons';
import React from 'react';
import { Link } from 'react-router-dom';

const HeaderNav = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light container">
        <div className="container-fluid">
            <Link className="navbar-brand" to='/'><small>Dev</small><strong>| KON</strong></Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse " id="navbarNav">
                <ul className="navbar-nav  ml-auto">
                    <li className="nav-item m-3">
                        <Link className="nav-link active" aria-current="page" to="/home"><Home></Home> Home</Link>
                    </li>
                    <li className="nav-item m-3">
                        {/* <a href="#projects" className="nav-link" >Projects</a> */}
                        <Link to="/projects"  className="nav-link"><DeveloperMode></DeveloperMode> Projects</Link>
                    </li>
                    <li className="nav-item m-3">
                        <Link className="nav-link" to="/blog"><Book></Book> Blog</Link>
                    </li>
                    <li className="nav-item m-3">
                        <Link className="nav-link" to="/resume"><CloudDownload></CloudDownload> Resume</Link>
                    </li>
                    <li className="nav-item m-3">
                        <Link className="nav-link" to="/about"><Group></Group> About</Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    );
};

export default HeaderNav;