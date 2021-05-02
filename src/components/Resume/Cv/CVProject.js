import React from 'react';
import './Cv.css';
const CVProject = (props) => {
    const {name , date , fun1 , fun2 , fun3 , btn, Live,ClientCode,serverCode} = props.project;
    return (
        <ul style={{listStyleType:"circle" , borderBottom: '4px solid lightgrey' , paddingBottom: "20px"}}> 
                        <li>
                            <div style={{display: "flex" , justifyContent: "flex-start" , alignItems: "center"}}>
                            <h1 className="diviceBorder">{name}</h1> <span className="deviceSpan">----full stack project</span>
                            </div>
                            <small style={{marginTop: "-20px" , display: "block" , color: "#777777"}}>{date}</small>
                            <h3 style={{marginTop: "-2px"}}>Core Functionality:</h3>
                            <ol className="functionality">
                                <li>{fun1}</li>
                                <li>{fun2}</li>
                                <li>{fun3}</li>
                            </ol>

                            <h3 style={{marginTop: "20px"}}>Technology:</h3>
                            <ol className="functionality" style={{listStyleType:'none'}}>
                                <li>React JS, Stripe Payment Gateway, Node JS, MongoDB, Express JS, Firebase Hosting and Authentication, Private
Route, ImageBB, Axios, Heroku(Server Hosting)</li>
                            </ol>
                            <div className="siteBtn">
                                <button><a href={Live}>LIVE SITE</a></button> <button><a href={ClientCode}>CLIENT CODE</a></button><button><a href={serverCode}>SERVER CODE</a></button>{btn && <button>{btn}</button>}
                                
                            </div>
                        </li>
                    </ul>
    );
};

export default CVProject;