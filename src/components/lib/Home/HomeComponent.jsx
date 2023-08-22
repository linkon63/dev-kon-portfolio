import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
// import { HashLink } from 'react-router-hash-link';
import { useSpring, animated, config } from "react-spring";
import Text from "../../animation/Text";

import softzinoTechnologies from "../../assests/softzinoTechnology.png";
import mgpLogo from "../../assests/mpgLogo.png";
import hatherkache from "../../assests/hatherKachePng.png";
import freelancer from "../../assests/freelancerPng.png";
// import Card from "./Cards/Card";
// import Detail from "./Details/Detail";
// import Cycle from "./Cycle/Cycle";
// import HeaderLeft from './HeaderLeft/HeaderLeft';
// import Footer from "../Shared/Footer/Footer";
// import TableSvg from "../SVG/TableSvg";
import "./HomeComponent.scss";
import "./Bubble.css";
import Card from "./Cards/Card";
import Skills from "./Skills/Skills";
// import Number from "../../animation/Number";
// import HeaderLeft from "./HeaderLeft/HeaderLeft";

const HomeComponent = () => {
  const [flip, set] = useState(false);
  // const [visible, setVisible] = useState("hidden");
  // const words = ["React", "mongoDB", "Firebase", "HTML", "Redux", "Vue JS"];
  // const cardInfo = [
  //   {
  //     id: 1,
  //     name: "Softzino Technologies",
  //     image: `${softzinoTechnologies}`,
  //     color: "#232323",
  //     join: "05-05-2021",
  //     end: "06-05-23",
  //     detail:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, deleniti!",
  //   },
  //   {
  //     id: 2,
  //     name: "MY Path Guider",
  //     image: `${mgpLogo}`,
  //     color: "rgb(21 80 118)",
  //     join: "05-05-2021",
  //     end: "06-05-23",
  //     detail:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, deleniti!",
  //   },
  //   {
  //     id: 3,
  //     name: "Hather Kache",
  //     image: `${hatherkache}`,
  //     color: "#feb624",
  //     join: "05-05-2021",
  //     end: "06-05-23",
  //     detail:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, deleniti!",
  //   },
  //   {
  //     id: 4,
  //     name: "Freelancer",
  //     image: `${freelancer}`,
  //     color: "#29ad24",
  //     join: "05-05-2021",
  //     end: "06-05-23",
  //     detail:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, deleniti!",
  //   },
  // ];
  // const { scroll } = useSpring({
  //   scroll: (words.length - 1) * 110,
  //   from: { scroll: 0 },
  //   reset: true,
  //   reverse: flip,
  //   delay: 400,
  //   config: config.molasses,
  //   onRest: () => set(!flip),
  // });

  // const { pathname, hash, key } = useLocation();

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
      <Skills />
  );
};

export default HomeComponent;
