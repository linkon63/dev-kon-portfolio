import React from 'react';
import Footer from '../../Shared/Footer/Footer';
import HeaderNav from '../../Shared/HeaderNav/HeaderNav';
import './Cv.css'
import projectData from './CvData';
import CVProject from './CVProject';
import ResumePdf from '../../../Data/Linkon_Dev_4.pdf'
const Cv = () => {
    
    return (
        <div>
            <HeaderNav></HeaderNav>
                <div className="mt-5">
                    <header>
                    <a href={ResumePdf} download="Resume of Dev Linkon">
                        <button className="btn btn-success mb-5">Download Resume</button>
                    </a>
                        <div className="row mb-5">
                            <div className="col-md-12 col-sm-12 container">
                                <h3>MD ABDUL AHAD LINKON</h3>
                            </div>
                        </div>
                        {/* <h1 className="mb-5">MD ABDUL AHAD LINKON</h1> */}

                        <p>FULL STACK DEVELOPER</p>
                        <p>HABIGANJ SADAR</p>
                        <p>SYLHET, BANGLADESH</p>
                        <p className="phone"><small><b>+8801712508063</b></small></p>

                        <div className="row">
                            <div className="col-md-12  d-flex justify-content-center">
                                <table className="text-center">
                                    <tr>
                                        <td>Email : </td>
                                        <td>m.alinkon10@gmail.com</td>
                                    </tr>
                                    <tr>
                                        <td>Github : </td>
                                        <td>https://github.com/linkon63</td>
                                    </tr>
                                    <tr>
                                        <td>LinkedIn : </td>
                                        <td>https://www.linkedin.com/in/md-abdul-ahad-linkon-5988161b8/</td>
                                    </tr>
                                    <tr>
                                        <td>Portfolio : </td>
                                        <td>https://dev-kon-portfolio.web.app/</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </header>
                    <section className="skils">
                    <dl>
                        <dt><h1 className="title">SKILLS</h1></dt>
                        <dd>
                            <div>
                                <p className="skillData"><span className="skillName">CORE SKILLS:</span> JavaScript / Node JS, MongoDB, Express JS, Typescript, React JS</p>
                                <p className="skillData"><span className="skillName">TECHNOLOGY SKILLS:</span> HTML5, SASS, CSS3, Material UI, React-Bootstrap, GIT , GitHub, GITLAB, HEROKU,
                                Firebase, Chrome Elements Inspector, Firebug
                                </p>
                            </div>
                        </dd>

                        <dt><h1 className="title">PROJECTS</h1></dt>
                        <dd>
                            <div>
                                
                                {
                                    projectData.map(project => <CVProject project={project}></CVProject>)
                                }
                                
                            </div>
                        </dd>
                        
                        <dt><h1 className="title">EDUCATION</h1>
                                <dd>
                                    <div style={{display: "flex" , justifyContent: "flex-start" , alignItems: "center"}}>
                                            <h1 style={{fontSize: "18px"}}>HABIGANJ POLYTECHNIC INSTITUTE</h1> <span className="deviceSpan">— Diploma in Computer Technology</span>
                                    </div>
                                </dd>
                        </dt>

                        <dt><h1 className="title">COURSES</h1>
                                <dd>
                                    <div style={{display: "flex" , justifyContent: "flex-start" , alignItems: "center"}}>
                                        <h1 style={{fontSize: "18px"}}>COMPLETED WEB DEVELOPMENT COURSE WITH JHANKAR MAHBUB</h1> <span className="deviceSpan">---Full Stack Web Development Course </span>
                                    </div>
                                    <small style={{marginTop: "-20px" , display: "block" , color: "grey", fontSize: "18px"}}>Dec 2020 - April 2021 <br/> Complete with an average of 58 out of 60</small>
                                    
                                    <div style={{display: "flex" , justifyContent: "flex-start" , alignItems: "center"}}>
                                        <h1 style={{fontSize: "18px"}}>RESPONSIVE WEB DESIGN FREECODECAMP
                                        </h1>
                                    </div>
                                    <small style={{marginTop: "-20px" , display: "block" , color: "grey", fontSize: "18px"}}>Dec 2020 - Dec 2020</small>
                                    <a href="" style={{color: "blue"}}>Certificate</a>

                                </dd>
                        </dt>

                        <dt><h1 className="title">ACTIVITIES</h1>
                        <small style={{color: 'grey'  , fontSize: "16px" , marginTop: "-20px" , display: "block"}}><b>Diploma in Engineering (Group Project)</b></small>
                        
                        
                        <h1 style={{fontSize: "18px"}}>-STUDENT RESULT MANAGEMENT SYSTEM BY PHP<sub>
                        <span className="deviceSpan"> (Skill Competition 2018)</span></sub><sup>1st Place</sup></h1>
                                
                        <h1 style={{fontSize: "18px"}}>-RENEWABLE ENERGY<sub>
                        <span className="deviceSpan"> (Skill Competition 2016)</span></sub><sup>3rd Place
                        </sup></h1>
                                
                        </dt>
                        <dt><h1 className="title">ABOUT ME</h1>
                        <h1 style={{fontSize: "18px"}}>-QUICK LEARNER, PROACTIVE, AND HAS STRONG WORK ETHICS</h1>
                        <h1 style={{fontSize: "18px"}}>-GROUP MANAGEMENT</h1>
                        <h1 style={{fontSize: "18px"}}>-PROBLEM SOLVER</h1>
                        </dt>
                    </dl>
                    </section>   
                    </div>
                <Footer></Footer>
        </div>
    );
};

export default Cv;