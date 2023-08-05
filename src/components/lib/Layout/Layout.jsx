import React from "react";
import TopNavbar from "../Shared/Navbar/TopNavbar";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaLinkedinIn,
  FaGit,
  FaEnvelope,
  FaCopyright,
} from "react-icons/fa";

const Layout = ({ props }) => {
  return (
    <div>
      <TopNavbar />
      <div
        className="row m-0 p-0 w-100 headerSection"
        style={{ height: "100vh", width: "100%" }}
      >
        <div className="col-xl-6 col-md-6 col-sm-12 h-100">
          <div className="d-flex justify-content-center align-items-center h-100">
            <div className="text-white">
              <h1 className="text-white">Hello Welcome to the code world</h1>
              <p>Explore me </p>
              <Link to="/" className="text-white">
                <h4>/ skills &#9626;</h4>
              </Link>
              <Link to="/about" className="text-white">
                <h4>/ know about me &#9728;</h4>
              </Link>
              <Link to="/projects" className="text-white">
                <h4>/ Interesting projects I have worked &#9928; </h4>
              </Link>
              <Link to="/resume" className="text-white">
                <h4>/ resume &#9611;</h4>
              </Link>
              <Link to="/blogs" className="text-white">
                <h4>/ watch blogs &#128421;</h4>
              </Link>
              <Link to="/contact" className="text-white">
                <h4>/ do you have ideas? &#9993; </h4>
              </Link>
              <div>
                <p>Find me here &#128640;</p>
                <button className="btn ps-4 pe-4 bg-white fw-bold">
                  Resume &#128376;
                </button>
                <div className="d-flex pt-3">
                  <p className="m-2 social-icon">
                    <FaLinkedinIn />
                  </p>
                  <p className="m-2 social-icon">
                    <FaGit />
                  </p>
                  <p className="m-2 social-icon">
                    <FaEnvelope />
                  </p>
                  <p className="m-2 social-icon">
                    <FaFacebook />
                  </p>
                </div>
                <div className="pt-5">
                  <span className="social-icon">
                    Site design / logo <FaCopyright /> -
                    {new Date().getFullYear()} dev|kon; user contributions
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-6 col-md-6 col-sm-12 d-flex align-items-center">
          {props}
        </div>
      </div>
    </div>
  );
};

export default Layout;
