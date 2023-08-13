import React from "react";
import appleDoctor from "../../assests/appledoctor.png";
import doctorAppointment from "../../assests/doctor appointment.png";
import emajohn from "../../assests/ema-jhon.png";
import rideshare from "../../assests/Ride.png";
import "./Product.scss";
export default function Project() {
  return (
    <div className="row">
      {/* apple doctor */}
      <div className="col-md-6">
        <div class="card bg-dark mt-4">
          <img src={appleDoctor} class="card-img-top" alt="..." />
          <div class="card-body">
            <div class="text-section">
              <h5 class="card-title fw-bold text-white">Smart Device Repair</h5>
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
              <h5 class="card-title fw-bold text-white">Doctor-Appointment</h5>
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
              <p class="card-text text-white">Full Stack e-Commerce project</p>
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
      <div className="col-md-6">
        <div class="card bg-dark mt-4">
          <img src={rideshare} class="card-img-top" alt="..." />
          <div class="card-body">
            <div class="text-section">
              <h5 class="card-title fw-bold text-white">Ride share</h5>
              <p class="card-text text-white">Full Stack book your ride</p>
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
      {/* <div className="col-md-6">
        <div class="card bg-dark mt-4">
          <img src={appleDoctor} class="card-img-top" alt="..." />
          <div class="card-body">
            <div class="text-section">
              <h5 class="card-title fw-bold text-white">Smart Device Repair</h5>
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
      <div className="col-md-6">
        <div class="card bg-dark mt-4">
          <img src={appleDoctor} class="card-img-top" alt="..." />
          <div class="card-body">
            <div class="text-section">
              <h5 class="card-title fw-bold text-white">Smart Device Repair</h5>
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
      </div> */}
    </div>
  );
}
