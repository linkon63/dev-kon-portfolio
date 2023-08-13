import React from "react";
import { Link } from "react-router-dom";
import appleDoctor from "../../../assests/appledoctor.png";
import doctorAppointment from "../../../assests/doctor appointment.png";
import emajohn from "../../../assests/ema-jhon.png";
import rideshare from "../../../assests/Ride.png";
import taskmanager from "../../../assests/project pania.png";
import blog from "../../../assests/blog.png";
export default function AllProject() {
  return (
    <div>
      <div className="row">
        <div className="col-md-3 bg-dark" style={{ height: "100vh" }}>
          <div className="ps-5 d-flex justify-content-right align-items-center h-100">
            <div className="text-white">
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
                {/* <div className="d-flex pt-3">
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
                  </div> */}
                {/* <div className="pt-5">
                    <span className="social-icon">
                      Site design / logo <FaCopyright /> -
                      {new Date().getFullYear()} dev|kon; user contributions
                    </span>
                  </div> */}
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-9 bg-secondary" style={{ height: "100vh" }}>
          <div className="row">
            {/* apple doctor */}
            <div className="col-md-6">
              <div class="card bg-dark mt-4">
                <img src={appleDoctor} class="card-img-top" alt="..." />
                <div class="card-body">
                  <div class="text-section">
                    <h5 class="card-title fw-bold text-white">
                      Smart Device Repair
                    </h5>
                    <p class="card-text text-white">
                      Full Stack Smart device repair center
                    </p>
                  </div>
                  <div class="cta-section">
                    <a
                      href="https://appledoctorclient.netlify.app/"
                      class="btn btn-light m-1"
                    >
                      Live
                    </a>
                    <a
                      href="https://github.com/linkon63/Apple-Doctor-Client"
                      class="btn btn-light  m-1"
                    >
                      Client
                    </a>
                    <a
                      href="https://github.com/linkon63/Apple-Doctor-Server"
                      class="btn btn-light  m-1"
                    >
                      Server
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* doctor appointment */}
            <div className="col-md-6">
              <div class="card bg-dark mt-4">
                <img src={doctorAppointment} class="card-img-top" alt="..." />
                <div class="card-body">
                  <div class="text-section">
                    <h5 class="card-title fw-bold text-white">
                      Doctor-Appointment
                    </h5>
                    <p class="card-text text-white">
                      Full Stack doctor appointment project
                    </p>
                  </div>
                  <div class="cta-section">
                    <a
                      href="https://doctor-portal-login.web.app/"
                      class="btn btn-light m-1"
                    >
                      Live
                    </a>
                    <a
                      href="https://github.com/linkon63/Doctor-Portal-Client"
                      class="btn btn-light  m-1"
                    >
                      Client
                    </a>
                    <a
                      href="https://github.com/linkon63/Doctor-Portal-Server"
                      class="btn btn-light  m-1"
                    >
                      Server
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* vue js project */}
            <div className="col-md-6">
              <div class="card bg-dark mt-4">
                <img src={taskmanager} class="card-img-top" alt="..." />
                <div class="card-body">
                  <div class="text-section">
                    <h5 class="card-title fw-bold text-white">
                      Mange your task
                    </h5>
                    <p class="card-text text-white">
                      VUE project task manager, state manage by pania js
                    </p>
                  </div>
                  <div class="cta-section">
                    <a
                      href="https://vue-2-pania-state.netlify.app/"
                      class="btn btn-light m-1"
                    >
                      Live
                    </a>
                    <a
                      href="https://github.com/linkon63/Vue-2-Pania-State"
                      class="btn btn-light  m-1"
                    >
                      Client
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* react native project */}
            <div className="col-md-6">
              <div class="card bg-dark mt-4">
                {/* <img src={appleDoctor} class="card-img-top" alt="..." /> */}
                <div class="card-body">
                  <div class="text-section">
                    <h5 class="card-title fw-bold text-white">Get your food</h5>
                    <p class="card-text text-white">
                      React native android project like as foodpanda
                    </p>
                  </div>
                  <div class="cta-section">
                    <a
                      href="https://github.com/linkon63/getYourFood"
                      class="btn btn-light m-1"
                    >
                      Code
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div class="card bg-dark mt-4">
                <img src={emajohn} class="card-img-top" alt="..." />
                <div class="card-body">
                  <div class="text-section">
                    <h5 class="card-title fw-bold text-white">ema-john</h5>
                    <p class="card-text text-white">
                      Full Stack e-Commerce project
                    </p>
                  </div>
                  <div class="cta-section">
                    <a
                      href="https://m-fourty-one-ema-jhon-react.web.app/"
                      class="btn btn-light m-1"
                    >
                      Live
                    </a>
                    <a
                      href="https://github.com/linkon63/M-48-Ema-Jhon-Auth-Cilent-Site"
                      class="btn btn-light  m-1"
                    >
                      Client
                    </a>
                    <a
                      href="https://github.com/linkon63/M-48-Ema-John-Server"
                      class="btn btn-light  m-1"
                    >
                      Server
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* ride share */}
            <div className="col-md-6">
              <div class="card bg-dark mt-4">
                <img src={rideshare} class="card-img-top" alt="..." />
                <div class="card-body">
                  <div class="text-section">
                    <h5 class="card-title fw-bold text-white">Ride share</h5>
                    <p class="card-text text-white">
                      Full Stack book your ride
                    </p>
                  </div>
                  <div class="cta-section">
                    <a
                      href="https://assignment-nine-f6279.web.app/home"
                      class="btn btn-light m-1"
                    >
                      Live
                    </a>
                    <a
                      href="https://github.com/linkon63/assignment-nine"
                      class="btn btn-light  m-1"
                    >
                      Client
                    </a>
                    <a
                      href="https://github.com/linkon63/assignment-nine"
                      class="btn btn-light  m-1"
                    >
                      Server
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* blog project */}
            <div className="col-md-6">
              <div class="card bg-dark mt-4">
                <img src={blog} class="card-img-top" alt="..." />
                <div class="card-body">
                  <div class="text-section">
                    <h5 class="card-title fw-bold text-white">Vue Blog</h5>
                    <p class="card-text text-white">
                      Blog route project by vue
                    </p>
                  </div>
                  <div class="cta-section">
                    <a
                      href="https://vue-1-blog-page.netlify.app/#/"
                      class="btn btn-light m-1"
                    >
                      Live
                    </a>
                    <a
                      href="https://github.com/linkon63/Vue-1-Blog-Page"
                      class="btn btn-light  m-1"
                    >
                      Client
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div class="card bg-dark mt-4">
                {/* <img src={blog} class="card-img-top" alt="..." /> */}
                <div class="card-body">
                  <div class="text-section">
                    <h5 class="card-title fw-bold text-white">Rent a car</h5>
                    <p class="card-text text-white">
                      Car rent in react and sql project
                    </p>
                  </div>
                  <div class="cta-section">
                    <a
                      href="https://github.com/linkon63/pp-1.1-rent-a-service-server"
                      class="btn btn-light m-1"
                    >
                      Backend
                    </a>
                    <a
                      href="https://github.com/linkon63/pp1.1-rent-a-service-client"
                      class="btn btn-light  m-1"
                    >
                      Client
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
