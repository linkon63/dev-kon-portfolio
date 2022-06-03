import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { useSpring, animated, config } from 'react-spring';
import Text from '../../animation/Text';

import softzinoTechnologies from '../../assests/softzinoTechnology.png'
import mgpLogo from '../../assests/mpgLogo.png'
import hatherkache from '../../assests/hatherKachePng.png'
import freelancer from '../../assests/freelancerPng.png'
import Card from './Cards/Card';
import Detail from './Details/Detail';
import Cycle from './Cycle/Cycle';
import HeaderLeft from './HeaderLeft/HeaderLeft';
import Footer from '../Shared/Footer/Footer';
import TableSvg from '../SVG/TableSvg';
import './HomeComponent.css'
import './Bubble.css'

const HomeComponent = () => {
    const [flip, set] = useState(false)

    const words = ['React', 'mongoDB', 'Firebase', 'HTML', 'Redux', 'Vue JS']
    const cardInfo = [
        { id: 1, name: "Softzino Technologies", image: `${softzinoTechnologies}`, color: '#232323', join: '05-05-2021', end: '06-05-23', detail: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, deleniti!' },
        { id: 2, name: "MY Path Guider", image: `${mgpLogo}`, color: "rgb(21 80 118)", join: '05-05-2021', end: '06-05-23', detail: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, deleniti!' },
        { id: 3, name: "Hather Kache", image: `${hatherkache}`, color: "#feb624", join: '05-05-2021', end: '06-05-23', detail: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, deleniti!' },
        { id: 4, name: "Freelancer", image: `${freelancer}`, color: '#29ad24', join: '05-05-2021', end: '06-05-23', detail: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, deleniti!' },

    ]
    const { scroll } = useSpring({
        scroll: (words.length - 1) * 110,
        from: { scroll: 0 },
        reset: true,
        reverse: flip,
        delay: 400,
        config: config.molasses,
        onRest: () => set(!flip),
    })


    const { pathname, hash, key } = useLocation();

    useEffect(() => {
        // if not a hash link, scroll to top
        if (hash === '') {
            window.scrollTo(0, 0);
        }
        // else scroll to id
        else {
            setTimeout(() => {
                const id = hash.replace('#', 'Experience');
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView();
                }
            }, 0);
        }
    }, [pathname, hash, key]); // do this on route change

    return (
        <section className='mt-1'>

            {/* header section start*/}
            <header className='row m-0 p-0 w-100 h-100'
            // style={{ height: '100vh', width: "100%" }}
            >
                {/* left site start*/}
                <div className="col-xl-6 col-md-12 col-sm-12 h-100">
                    {/* <HeaderLeft /> */}
                    <TableSvg />
                    <div className='text-center m-2 p-2'>
                        <button className='btn '> <h1>Lets talk</h1></button>
                    </div>

                </div>
                {/* left site end*/}
                {/* right site start*/}
                <div className="col-xl-6 col-md-12 col-sm-12 h-100">
                    <div className='m-0 p-0'>
                        <div className='row m-0 p-0 mb-2'
                            style={{ height: "20vh" }}>
                            <div className="col-md-6 m-0 p-1 bg-warning d-flex align-items-end justify-content-end">
                                <Text inComing={<h1 className='fw-bold text-white'>Javascript</h1>} />
                            </div>
                            <div className="col-md-4 m-0 p-1 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#3c823b' }}>
                                <h1 className='text-white d-flex'>
                                    Node <Text inComing={"JS"} />
                                </h1>
                            </div>
                            <div className="col-md-2 m-0 p-1 text-center bg-primary">
                                <Text inComing={<h6 className='text-white fst-italic fw-bold'>Express js</h6>} />
                            </div>
                        </div>
                        {/* animation */}
                        <div className=''>
                            <animated.div
                                style={{
                                    position: '',
                                    width: '100%',
                                    height: 110,
                                    overflow: 'hidden',
                                    fontSize: '80px',
                                }}
                                scrollTop={scroll}>
                                {words.map((word, i) => (
                                    <div className=''
                                        key={`${word}_${i}`}
                                        style={{
                                            width: '100%', height: 110, textAlign: 'center',
                                            color: 'white',
                                            backgroundColor: `${word === 'React' ? "#5ed3f3"
                                                : word === 'mongoDB' ? "#00e962"
                                                    : word === 'Firebase' ? "#f19411" :
                                                        word === 'Redux' ? "#f19411"
                                                            : word === 'HTML' ? 'black'
                                                                : word === 'Vue JS' ? '#3fb27f'
                                                                    : 'silver'
                                                }`
                                        }}>
                                        {word}
                                    </div>
                                ))}
                            </animated.div>
                        </div>
                        {/* simple text */}
                        <div className='text-center' style={{ height: "5vh" }}>
                            <p className='text-uppercase fw-bold fs-6 p-2 m-0 text-dark'>Technologies you need</p>
                        </div>
                        {/* carousel */}
                        <div className='' style={{ height: "15vh" }}>
                            <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="false">
                                <div className="carousel-indicators">
                                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3" aria-label="Slide 3"></button>
                                </div>
                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <div style={{ height: "120px", backgroundColor: "#15b4c1" }}
                                            className="d-block w-100">
                                        </div>
                                        <div className="carousel-caption d-none d-md-block ">
                                            <h5 className='fw-bold'>tailwindcss</h5>
                                        </div>
                                    </div>
                                    <div className="carousel-item">
                                        <div style={{ height: "120px", backgroundColor: "#146cad" }}
                                            className="d-block w-100">
                                        </div>
                                        <div className="carousel-caption d-none d-md-block ">
                                            <h5 className='fw-bold'>CSS3</h5>
                                        </div>
                                    </div>
                                    <div className="carousel-item">
                                        <div style={{ height: "120px", backgroundColor: "#bf578d" }}
                                            className="d-block w-100">
                                        </div>
                                        <div className="carousel-caption d-none d-md-block ">
                                            <h5 className='fw-bold'>Sass</h5>
                                        </div>
                                    </div>
                                    <div className="carousel-item">
                                        <div style={{ height: "120px", backgroundColor: "#7430f9" }}
                                            className="d-block w-100">
                                        </div>
                                        <div className="carousel-caption d-none d-md-block ">
                                            <h5 className='fw-bold'>Bootstrap</h5>
                                        </div>
                                    </div>

                                </div>
                                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div>
                        {/* animation */}
                        <div className='row m-0 p-0' style={{ height: "" }}>
                            <div className="col-md-6 m-0 p-1 d-flex align-items-end justify-content-start" style={{ backgroundColor: "#376fa0" }}>
                                <Text inComing={<h1 className='fw-bold' style={{ color: '#ffd140' }}>Python</h1>} />
                            </div>
                            <div className="col-md-2 m-0 p-1 text-center text-white d-flex align-items-center" style={{ backgroundColor: '#5ed3f3' }}>
                                <h6 className='fw-lighter fst-italic'>React Native</h6>
                            </div>
                            <div className="col-md-4 m-0 p-1 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#092d1f' }}>
                                <h1 className='text-white d-flex fw-bold'
                                ><Text inComing={"Django"} /></h1>
                            </div>
                        </div>
                    </div>
                </div>
                {/* right site end*/}
            </header>
            {/* header section end*/}

            {/* experience section start*/}
            <div className='text-center background-text-1 p-3' id="#Experience" >
                <div>
                    <h3 id="#Experience" className='font-style'>Experiences</h3>
                </div>

                <div className="row g-0 mt-5 p-0 ">
                    {
                        cardInfo.map(sCard =>
                            <div className="col-md-3 col-sm-12 mb-2">
                                <Card key={sCard.id.toString()}
                                    image={sCard.image}
                                    content={sCard.name}
                                    color={sCard.color}
                                    join={sCard.join}
                                    end={sCard.end}
                                    detail={sCard.detail}
                                />
                            </div>
                        )
                    }

                </div>
            </div>
            {/* experience section end*/}

            {/* technology section start*/}
            <div className='text-center background-text-2 p-3 mt-5' >
                <div>
                    <h3 className='font-style'>Technologies</h3>
                </div>
                <div className='row'>
                    <Detail />
                </div>
            </div>
            {/* technology section end*/}

            {/* cycle section start*/}
            <div className='text-center background-text-3 p-3 mt-5' >
                <div>
                    <h3 className='font-style'>Day Cycle</h3>
                </div>
                <div className=''>
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