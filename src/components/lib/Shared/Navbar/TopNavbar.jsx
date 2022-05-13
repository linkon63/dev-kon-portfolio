import React from 'react';
import { Link } from 'react-router-dom';

const TopNavbar = () => {
    return (
        <>
            <button className="btn btn-primary"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasTop"
                aria-controls="offcanvasTop">
                Toggle top offcanvas
            </button>

            <section className="offcanvas offcanvas-top"
                tabIndex="-1"
                id="offcanvasTop"
                aria-labelledby="offcanvasTopLabel">

                <div className="offcanvas-header">
                    <h5 id="offcanvasTopLabel">Offcanvas top</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>

                <div className="offcanvas-body">
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
                </div>

            </section>
        </>
    );
};

export default TopNavbar;