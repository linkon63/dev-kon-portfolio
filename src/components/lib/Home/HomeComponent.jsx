import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
// import { HashLink } from 'react-router-hash-link';
import { useSpring, animated, config } from "react-spring";
import Text from "../../animation/Text";

import softzinoTechnologies from "../../assests/softzinoTechnology.png";
import mgpLogo from "../../assests/mpgLogo.png";
import hatherkache from "../../assests/hatherKachePng.png";
import freelancer from "../../assests/freelancerPng.png";
import Card from "./Cards/Card";
import Detail from "./Details/Detail";
import Cycle from "./Cycle/Cycle";
// import HeaderLeft from './HeaderLeft/HeaderLeft';
import Footer from "../Shared/Footer/Footer";
import TableSvg from "../SVG/TableSvg";
import "./HomeComponent.scss";
import "./Bubble.css";
import Number from "../../animation/Number";

const HomeComponent = () => {
  const [flip, set] = useState(false);
  const [visible, setVisible] = useState("hidden");
  const words = ["React", "mongoDB", "Firebase", "HTML", "Redux", "Vue JS"];
  const cardInfo = [
    {
      id: 1,
      name: "Softzino Technologies",
      image: `${softzinoTechnologies}`,
      color: "#232323",
      join: "05-05-2021",
      end: "06-05-23",
      detail:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, deleniti!",
    },
    {
      id: 2,
      name: "MY Path Guider",
      image: `${mgpLogo}`,
      color: "rgb(21 80 118)",
      join: "05-05-2021",
      end: "06-05-23",
      detail:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, deleniti!",
    },
    {
      id: 3,
      name: "Hather Kache",
      image: `${hatherkache}`,
      color: "#feb624",
      join: "05-05-2021",
      end: "06-05-23",
      detail:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, deleniti!",
    },
    {
      id: 4,
      name: "Freelancer",
      image: `${freelancer}`,
      color: "#29ad24",
      join: "05-05-2021",
      end: "06-05-23",
      detail:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, deleniti!",
    },
  ];
  const { scroll } = useSpring({
    scroll: (words.length - 1) * 110,
    from: { scroll: 0 },
    reset: true,
    reverse: flip,
    delay: 400,
    config: config.molasses,
    onRest: () => set(!flip),
  });

  const { pathname, hash, key } = useLocation();

  // useEffect(() => {
  //     // if not a hash link, scroll to top
  //     if (hash === '') {
  //         window.scrollTo(0, 0);
  //     }
  //     // else scroll to id
  //     else {
  //         setTimeout(() => {
  //             const id = hash.replace('#', 'Experience');
  //             const element = document.getElementById(id);
  //             if (element) {
  //                 element.scrollIntoView();
  //             }
  //         }, 0);
  //     }
  // }, [pathname, hash, key]); // do this on route change

  // const onMouseOver = () => {
  //     setVisible("visible")
  //     console.log("mouse hover")
  // }
  // const onMouseLeave = () => {
  //     setVisible("visible")
  //     console.log("mouse leave")
  // }

  return (
    <section className="">
      {/* header section start*/}
      <header
        className="row m-0 p-0 w-100 headerSection"
        style={{ height: "95vh", width: "100%" }}
      >
        {/* left site end*/}
        <div className="col-xl-4 col-md-4 col-sm-12 midSection">
          <div className="h-100">
            <div
              className="col h-25 row align-items-center"
              style={{ visibility: visible }}
            >
              <div className="col h-100 d-flex align-items-end">
                <Text
                  inComing={
                    <h1 className="fw-bold text-warning">Javascript</h1>
                  }
                />
              </div>
              <div className="col m-0 p-0">
                <h1 className="d-flex">
                  <span style={{ color: "#3c823b" }}>Node</span>
                  <Text inComing={<span className="text-warning">JS</span>} />
                </h1>
                <span className="d-flex">
                  <Text
                    inComing={
                      <h6 className="fw-lighter fst-italic fw-bold">
                        Express js
                      </h6>
                    }
                  />
                  <h1 className="text-white d-flex fw-bold pt-2">
                    <Text inComing={"Django"} />
                  </h1>
                </span>
              </div>
            </div>
            <div className="col h-50 d-flex justify-content-center align-items-center">
              <p className="mt-3 rounded fw-bold btn border-0">
                {visible === "hidden" ? (
                  <Text
                    inComing={
                      <button
                        className="fw-bold p-2 btn border-0 text-light"
                        style={{ backgroundColor: "#aa0505" }}
                      >
                        !
                      </button>
                    }
                  />
                ) : (
                  <span className="">
                    <Number />
                  </span>
                )}
              </p>
            </div>
            <div
              className="col h-25 d-flex align-items-start"
              style={{ visibility: visible }}
            >
              <div className="col h-100 d-flex align-items-start">
                <div>
                  <Text
                    inComing={
                      <h1 className="fw-bold" style={{ color: "#3675ab" }}>
                        Python
                      </h1>
                    }
                  />
                  <Text
                    inComing={
                      <h6 className="fw-bold ms-5" style={{ color: "red" }}>
                        React Native
                      </h6>
                    }
                  />
                </div>
              </div>
              <div className="col m-0 p-0">
                {/* carousel */}
                <div className="" style={{ height: "15vh" }}>
                  <div
                    id="carouselExampleCaptions"
                    className="carousel slide"
                    data-bs-ride="false"
                  >
                    <div className="carousel-indicators">
                      <button
                        type="button"
                        data-bs-target="#carouselExampleCaptions"
                        data-bs-slide-to="0"
                        className="active"
                        aria-current="true"
                        aria-label="Slide 1"
                      ></button>
                      <button
                        type="button"
                        data-bs-target="#carouselExampleCaptions"
                        data-bs-slide-to="1"
                        aria-label="Slide 2"
                      ></button>
                      <button
                        type="button"
                        data-bs-target="#carouselExampleCaptions"
                        data-bs-slide-to="2"
                        aria-label="Slide 3"
                      ></button>
                      <button
                        type="button"
                        data-bs-target="#carouselExampleCaptions"
                        data-bs-slide-to="3"
                        aria-label="Slide 3"
                      ></button>
                    </div>
                    <div className="carousel-inner">
                      <div className="carousel-item active">
                        <div
                          style={{
                            height: "120px",
                            backgroundColor: "#15b4c1",
                          }}
                          className="d-block w-100"
                        ></div>
                        <div className="carousel-caption d-none d-md-block ">
                          <h5 className="fw-bold">tailwindcss</h5>
                        </div>
                      </div>
                      <div className="carousel-item">
                        <div
                          style={{
                            height: "120px",
                            backgroundColor: "#146cad",
                          }}
                          className="d-block w-100"
                        ></div>
                        <div className="carousel-caption d-none d-md-block ">
                          <h5 className="fw-bold">CSS3</h5>
                        </div>
                      </div>
                      <div className="carousel-item">
                        <div
                          style={{
                            height: "120px",
                            backgroundColor: "#bf578d",
                          }}
                          className="d-block w-100"
                        ></div>
                        <div className="carousel-caption d-none d-md-block ">
                          <h5 className="fw-bold">Sass</h5>
                        </div>
                      </div>
                      <div className="carousel-item">
                        <div
                          style={{
                            height: "120px",
                            backgroundColor: "#7430f9",
                          }}
                          className="d-block w-100"
                        ></div>
                        <div className="carousel-caption d-none d-md-block ">
                          <h5 className="fw-bold">Bootstrap</h5>
                        </div>
                      </div>
                    </div>
                    <button
                      className="carousel-control-prev"
                      type="button"
                      data-bs-target="#carouselExampleCaptions"
                      data-bs-slide="prev"
                    >
                      <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                      className="carousel-control-next"
                      type="button"
                      data-bs-target="#carouselExampleCaptions"
                      data-bs-slide="next"
                    >
                      <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="visually-hidden">Next</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* right site start*/}
        {/* <div className="col-xl-4 col-md-4 col-sm-12 rightSection pt-5" style={{ backgroundColor: "#dab356" }}>
                    <div class="background-one">
                        <div class="link-container">
                            <a class="link-one" href="https://jhancock532.github.io/link-hover-effects/">Projects</a>
                        </div>
                    </div>
                    <div class="background-two link-container">
                        <a class="link-two" href="https://jhancock532.github.io/link-hover-effects/">Resume</a>
                    </div>
                    <div class="background-three link-container">
                        <a class="link-three" href="https://jhancock532.github.io/link-hover-effects/">About</a>
                    </div>
                </div> */}
        {/* right site end*/}
      </header>
      {/* header section end*/}

      {/* experience section start*/}
      <div className="text-center background-text-1 p-3" id="#Experience">
        <div>
          <h3 id="#Experience" className="font-style">
            Experiences
          </h3>
        </div>

        <div className="row g-0 mt-5 p-0 ">
          {cardInfo.map((sCard) => (
            <div className="col-md-3 col-sm-12 mb-2">
              <Card
                key={sCard.id.toString()}
                image={sCard.image}
                content={sCard.name}
                color={sCard.color}
                join={sCard.join}
                end={sCard.end}
                detail={sCard.detail}
              />
            </div>
          ))}
        </div>
      </div>
      {/* experience section end*/}

      {/* technology section start*/}
      <div className="text-center background-text-2 p-3 mt-5">
        <div>
          <h3 className="font-style">Technologies</h3>
        </div>
        <div className="row">
          <Detail />
        </div>
      </div>
      {/* technology section end*/}

      {/* cycle section start*/}
      <div className="text-center background-text-3 p-3 mt-5">
        <div>
          <h3 className="font-style">Day Cycle</h3>
        </div>
        <div className="">
          <Cycle />
        </div>
      </div>
      {/* cycle section end*/}

      {/* footer section start */}
      <div>
        <Footer />
      </div>
      {/* footer section end */}
    </section>
  );
};

export default HomeComponent;
