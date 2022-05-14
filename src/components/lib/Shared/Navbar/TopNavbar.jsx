import React from 'react';
import { Link } from 'react-router-dom';
import navbarIcon from '../../../icons/navbarIcon.png'
import './TopNavbar.css'
const TopNavbar = () => {
    return (
        <>
            <section className='w-100 d-flex border border-bottom-1'>
                <div className='d-flex align-items-center w-50 '>
                    <p className='m-0'>Dev <span className='fw-bold'>|KON</span></p>
                </div>
                <div className='d-flex w-50 justify-content-end'>
                    <button className="btn"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasTop"
                        aria-controls="offcanvasTop">
                        <img src={navbarIcon} alt="navbarIcon" style={{ height: "26px", width: "26px" }} />
                    </button>
                </div>
            </section>

            <section className="offcanvas offcanvas-top"
                tabIndex="-1"
                id="offcanvasTop"
                aria-labelledby="offcanvasTopLabel">

                <div className="offcanvas-header">
                    <p id="offcanvasTopLabel" className='m-0 p-0'>Welcome to Dev<span className='fw-bold'>|KON</span></p>
                    <button type="button" className="btn-close text-reset m-0 p-0" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>

                <div className="offcanvas-body">
                    <section>
                        <div className="d-flex w-100">
                            <div className="col-md-4">
                                <h4>Routes</h4>
                                <Link to="/home">
                                    <span
                                        data-bs-dismiss="offcanvas">
                                        Home
                                    </span>
                                </Link>
                                <br />
                                <Link to="/about">
                                    <span
                                        data-bs-dismiss="offcanvas">
                                        About
                                    </span>
                                </Link>
                                <br />
                                <Link to="/about">
                                    <span
                                        data-bs-dismiss="offcanvas">
                                        Resume
                                    </span>
                                </Link>

                            </div>
                            <div className="col-md-2">
                                <h4>Social Link</h4>
                                <p className='m-0'>Facebook</p>
                                <p className='m-0'>LinkedIn</p>
                                <p className='m-0'>GitHub</p>
                            </div>
                            <div className="col-md-6 d-flex w-50 ">
                                <div className="w-25 d-flex justify-content-center align-items-center">
                                    <h4>Hire me</h4>
                                </div>
                                <div className="w-75">
                                    <div className='bg-light'>
                                        <div className="d-flex" >
                                            <div className="col-md-4">
                                                <img style={{ height: "100%", width: "100%" }}
                                                    src="https://randomuser.me/api/portraits/men/3.jpg" className="img-fluid rounded-start" alt="user"
                                                />
                                            </div>
                                            <div className="col-md-6 ms-2 d-flex justify-content-center align-items-center rounded">
                                                <div className="text-center">
                                                    <h5 className="card-title">MD. ABDUL AHAD LINKON</h5>
                                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

            </section>
        </>
    );
};

export default TopNavbar;