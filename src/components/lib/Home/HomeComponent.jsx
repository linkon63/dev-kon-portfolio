import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { useSpring, animated, config } from 'react-spring';
import Text from '../../animation/Text';

import softzinoTechnologies from '../../assests/softzinoTechnology.png'
import mgpLogo from '../../assests/mpgLogo.png'
import hatherkache from '../../assests/hatherKachePng.png'
import freelancer from '../../assests/freelancerPng.png'
import './HomeComponent.css'
import Card from './Cards/Card';
import Detail from './Details/Detail';

const HomeComponent = () => {
    const [flip, set] = useState(false)

    const words = ['React', 'mongoDB', 'Firebase', 'HTML', 'Redux', 'Vue JS']
    const cardInfo = [
        { id: 1, name: "Softzino Technologies", image: `${softzinoTechnologies}` },
        { id: 2, name: "MY Path Guider", image: `${mgpLogo}` },
        { id: 3, name: "Hather Kache", image: `${hatherkache}` },
        { id: 4, name: "Freelancer", image: `${freelancer}` },

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
        <section className=''>

            {/* header section start*/}
            <header className='row m-0 p-0' style={{ height: '100vh', width: "100%" }}>
                {/* left site start*/}
                <div className="col-md-6 col-sm-12 row align-items-center w-50 m-0 p-2 ">
                    <div className='m-0 p-0 w-100'>
                        <div className='row w-100'>
                            <h2 className='col-md-6 col-sm-12 fw-bold w-50 m-0 p-0  text-end' >Hello Dreamer!</h2>
                            <span className='col-md-6 col-sm-12 w-50 m-0 p-0'>build your dream project with me.</span>
                        </div>
                        <div className='row w-100  m-0 p-0'>
                            <p className='col-md-4 col-sm-12'>Choose your <b>technology.</b></p>
                            <div className='col-md-5 col-sm-12 m-0 p-0 '>
                                <h1 className='fw-bold'>Let's start</h1>
                            </div>
                            <p className='col-md-3 col-sm-12  m-0 p-0 mt-4'>this <b>project</b></p>
                        </div>
                        <div className="text-center">
                            <span className='row'>
                                I'm
                                <h1 className='fw-bold ms-2 me-2'>Linkon.</h1>
                                <span className="mt-4">Full-Stack Developer.</span>
                                <h1 className='fw-bold ms-2 me-2 pt-0'>Experienced </h1>
                                with Web Development.
                            </span>
                        </div>
                        <div className="text-end">
                            <span className='row'>

                                skilled in
                                <h1 className='fw-bold ms-1'>Web Applications</h1>
                                <b>
                                    Front-End Development,
                                </b>
                            </span>
                            <p className='fw-bold'>Back-End Development</p>
                        </div>
                        <div className="">
                            <span className='row'>
                                <h5 className='fw-bold me-1'>Web Security.Have</h5>
                                strong engineering <b className='ms-1 me-1'>professional</b>  knowledge with <b className='ms-1'>experience</b>
                            </span>
                        </div>
                    </div>

                </div>
                {/* left site end*/}
                {/* right site start*/}
                <div className="col-md-6 col-sm-12 w-50 d-flex justify-content-center">
                    <div className='m-0 p-0 w-100'
                    // style={{ height: "60vh" }}
                    >
                        <div className='row m-0 p-0 mt-5 mb-5'
                            style={{ height: "20vh" }}
                        >
                            <div className="col-md-6 m-0 p-1 bg-warning d-flex align-items-end justify-content-end">
                                <Text inComing={<h1 className='fw-bold text-white'>Javascript</h1>} />
                            </div>
                            <div className="col-md-4 m-0 p-1 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#3c823b' }}>
                                <h1 className='text-white d-flex'
                                // style={{ color: "#8bc500" }}
                                >Node <Text inComing={"JS"} /></h1>
                            </div>
                            <div className="col-md-2 m-0 p-1 text-center bg-primary">
                                <Text inComing={<h6 className='fw-lighter fst-italic fw-bold'>Express js</h6>} />
                                {/* <span className='text-warning fw-bold'>JS</span> */}
                            </div>
                        </div>
                        {/* animation */}
                        <div className='mb-5'>
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
                        <div className='text-center mb-5' style={{ height: "5vh" }}>
                            <p className='text-uppercase fw-bold fs-6 p-2 m-0 text-dark'>Technologies you need</p>
                        </div>
                        {/* carousel */}
                        <div className='mb-5' style={{ height: "15vh" }}>
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
                        <div className='row m-0 p-0 mt-2' style={{ height: "" }}>
                            <div className="col-md-6 m-0 p-1 border d-flex align-items-end justify-content-start" style={{ backgroundColor: "#376fa0" }}>
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
                            <div className="col-md-3 col-sm-12">
                                <Card key={sCard.id} image={sCard.image} content={sCard.name} />
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
                <div className='row border'>
                    <Detail />
                </div>
            </div>
            {/* technology section end*/}




        </section>
    );
};

export default HomeComponent;