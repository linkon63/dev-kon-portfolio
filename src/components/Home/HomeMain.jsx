import React from 'react';
import FacebookIcon from '@material-ui/icons/Facebook';
import { GetApp, GitHub, Instagram, LinkedIn } from '@material-ui/icons';
import CV from '../../Data/Linkon_Dev_4.pdf';
import './HomeMain.css';
import Typing from 'react-typing-animation';
const HomeMain = () => {
    return (
            <div className="row header-main">
                <div className="col-md-4 headerMainImage text-white d-flex justify-content-center align-items-center">
                    <div className="text-center">
                        <Typing>
                            <h3> <b>WELCOME</b> </h3>
                        </Typing>
                        <h6>TO <small>Dev</small> | KON </h6>
                    <div>
                        <Typing>
                            <h1>I Code Your Dream To Reality</h1>
                        </Typing> 
                    </div>
                        <h3>{new Date().getFullYear()} </h3>                    
                    </div>
                </div>
                <div className="col-md-8 d-flex justify-content-center align-items-center headerMainImageTwo">
                    <div className="container">
                        <div className="text-center bg-light">
                            
                            <a href="https://www.linkedin.com/in/md-abdul-ahad-linkon-5988161b8/"><LinkedIn fontSize='large' style={{color:'blue'}}></LinkedIn></a>                            
                            <a href="https://github.com/linkon63"><GitHub fontSize="large" color='disable'></GitHub></a>
                            <a href="https://www.facebook.com/lin.kon.63/"><FacebookIcon color="primary" fontSize="large"></FacebookIcon></a>
                            <a href="https://www.instagram.com/lin.kon.63/"><Instagram fontSize="large" style={{color:'red'}}></Instagram></a>
                                                        
                        </div>
                        <div className="container bg-color text-center p-5 text-white">   
                                <h1> <strong> I'm LIN | <span classname="text-white">KON</span> </strong></h1>
                                <p> <span style={{fontSize : '15px'}}>  full stack web developer</span> </p>
                                <a href={CV} download="Resume of Dev Linkon">
                                    <button className="btn btn-warning" ><GetApp></GetApp> Download Resume</button>
                                </a>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default HomeMain;