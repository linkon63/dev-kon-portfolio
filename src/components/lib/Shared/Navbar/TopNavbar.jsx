import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSpring, animated, config, Spring } from "@react-spring/web";
import Text from "../../../animation/Text";
import Details from "../../../animation/Details";

import styles from "../../../../../src/styles.module.css";

import navbarIcon from "../../../icons/navbarIcon.png";
import personalImage from "../../../assests/PersonalImage.png";
import arc from "../../../assests/arc.png";
import closeArc from "../../../assests/closeArc.png";
import "./TopNavbar.css";

const AnimFeTurbulence = animated("feTurbulence");
const AnimFeDisplacementMap = animated("feDisplacementMap");

const TopNavbar = () => {
  const [open, toggle] = useState(false);
  const [{ freq, factor, scale, opacity }] = useSpring(() => ({
    reverse: open,
    from: { factor: 10, opacity: 0, scale: 0.9, freq: "0.0175, 0.0" },
    to: { factor: 150, opacity: 1, scale: 1, freq: "0.0, 0.0" },
    config: { duration: 4000 },
  }));

  return (
    <>
      <section className="w-100 d-flex text-light navbar-head">
        <div
          className="d-flex align-items-center justify-content-center ps-5 pt-2"
          style={{ width: "95%" }}
        >
          <div className="d-flex ms-5 ps-5">
            <p className=" pt-2">Dev</p>|<p className=" pt-2">KON</p>
          </div>
        </div>
        <div className="d-flex justify-content-center" style={{ width: "5%" }}>
          <button
            className="btn text-white "
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasTop"
            aria-controls="offcanvasTop"
          >
            <div className="">|||</div>
            {/* <img
              className=""
              src={arc}
              alt="navbarIcon"
              style={{ height: "26px", width: "26px" }}
            /> */}
            {/* <img className='bg-light m-1 ' src={navbarIcon} alt="navbarIcon" style={{ height: "26px", width: "26px" }} /> */}
          </button>
        </div>
      </section>

      <section
        className="offcanvas offcanvas-top"
        tabIndex="-1"
        id="offcanvasTop"
        aria-labelledby="offcanvasTopLabel"
      >
        <div className="offcanvas-header headerBg">
          <h4
            id="offcanvasTopLabel"
            className="m-0 p-0 text-center w-100 text-light"
          >
            Welcome to Dev<span className="fw-bold">|KON</span>
          </h4>
        </div>

        <div className="offcanvas-body m-0 p-0 topNavContent">
          <section className="w-100 row justify-content-center">
            <div className="row w-100 justify-content-center">
              <div className="col-md-8 col-sm-12 text-center">
                <h6>Let's Go</h6>
                <Link to="/home">
                  <span data-bs-dismiss="offcanvas">/ home</span>
                </Link>
                <br />
                <Link to="/about">
                  <span data-bs-dismiss="offcanvas">/ about</span>
                </Link>
                <br />
                <Link to="/projects">
                  <span data-bs-dismiss="offcanvas">/ projects</span>
                </Link>
                <br />
                <Link to="/resume">
                  <span data-bs-dismiss="offcanvas">/ resume</span>
                </Link>
              </div>
              <div className="col-md-4 col-sm-12 d-flex justify-content-center align-items-center ">
                <Link to="/contact">
                  <span data-bs-dismiss="offcanvas">/ contact</span>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </section>
    </>
  );
};

export default TopNavbar;
