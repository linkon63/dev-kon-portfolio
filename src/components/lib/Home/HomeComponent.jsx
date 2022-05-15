import React, { useState } from 'react';
import { useSpring, animated, config } from 'react-spring';
import Text from '../../animation/Text';

import './HomeComponent.css'
const HomeComponent = () => {
    const [flip, set] = useState(false)

    const words = ['React', 'mongoDB', 'Firebase', 'HTML', 'Redux', 'Vue JS']

    const { scroll } = useSpring({
        scroll: (words.length - 1) * 110,
        from: { scroll: 0 },
        reset: true,
        reverse: flip,
        delay: 400,
        config: config.molasses,
        onRest: () => set(!flip),
    })
    return (
        <section className='container mt-2'>
            {/* header section */}
            <header className='row justify-content-center' style={{ height: '60vh', width: "100%" }}>
                {/* left site */}
                <div className="col-md-6 col-sm-12 d-flex align-items-center w-50 m-0 p-0 "
                >
                    <div className='m-0 p-0  w-100'>
                        <div className='row w-100'>
                            <h2 className='col-md-6 fw-bold w-50 m-0 p-0  text-end' >Hello Dreamer!</h2>
                            <span className='col-md-6 w-50 m-0 p-0'>build your dream project with me.</span>
                        </div>
                        <div className='row w-100  m-0 p-0'>
                            <p className='col-md-4 '>Choose your <b>technology.</b></p>
                            <div className='col-md-5 m-0 p-0 '>
                                <h1 className='fw-bold'>Let's start</h1>
                            </div>
                            <p className='col-md-3  m-0 p-0 mt-4'>this <b>project</b></p>
                        </div>
                        <div className="text-center">
                            <span className='d-flex '>
                                I'm
                                <h1 className='fw-bold ms-2 me-2'>Linkon.</h1>
                                <span className="mt-4">Full-Stack Developer.</span>
                                <h1 className='fw-bold ms-2 me-2 pt-0'>Experienced </h1>
                                with Web Development.
                            </span>
                        </div>
                        <div className="text-end">
                            <span className='d-flex'>

                                skilled in
                                <h1 className='fw-bold ms-1'>Web Applications</h1>
                                <b>
                                    Front-End Development,
                                </b>
                            </span>
                            <p className='fw-bold'>Back-End Development</p>
                        </div>
                        <div className="">
                            <span className='d-flex'>
                                <h5 className='fw-bold me-1'>Web Security.Have</h5>
                                strong engineering <b className='ms-1 me-1'>professional</b>  knowledge with <b className='ms-1'>experience</b>
                            </span>
                        </div>
                    </div>


                    {/* <span className='d-flex'>
                            Choose your technology and
                            <h1 className='fw-bold ms-1'> Let's start this project</h1>
                        </span>
                        <span className='d-flex'>
                            Choose your technology and
                            <h1 className='fw-bold ms-1'> build your project</h1>
                        </span> */}

                </div>
                {/* right site */}
                <div className="col-md-6 col-sm-12 w-50">
                    <div className='h-100' style={{ height: "55vh" }}>
                        <div className='row m-0 p-0 h-25'>
                            <div className="col-md-6 m-0 p-1 border bg-warning d-flex align-items-end justify-content-end">
                                <Text inComing={<h1 className='fw-bold text-white'>Javascript</h1>} />
                            </div>
                            <div className="col-md-4 m-0 p-1 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#8bc500' }}>
                                <h1 className='text-white d-flex'
                                // style={{ color: "#8bc500" }}
                                >Node <Text inComing={"js"} /></h1>
                            </div>
                            <div className="col-md-2 m-0 p-1 text-center bg-light">
                                <Text inComing={<h6 className='fw-lighter fst-italic'>Express js</h6>} />
                                {/* <span className='text-warning fw-bold'>JS</span> */}
                            </div>
                        </div>
                        {/* animation */}
                        <div className='border mt-2'>

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
                                            backgroundColor: `${word == 'React' ? "#5ed3f3"
                                                : word == 'mongoDB' ? "#00e962"
                                                    : word == 'Firebase' ? "#f19411" :
                                                        word == 'Redux' ? "#f19411"
                                                            : word == 'HTML' ? 'black'
                                                                : word == 'Vue JS' ? '#3fb27f'
                                                                    : 'silver'
                                                }`
                                        }}>
                                        {word}
                                    </div>
                                ))}
                            </animated.div>
                        </div>

                        <div className='text-center m-2 border'>
                            <p className='text-uppercase fw-bold fs-6 p-2 m-0'>Technologies you need</p>
                        </div>
                        <div className='border'>
                            <h3 className='fw-bold' style={{ color: "#146cad" }}>CSS3</h3>
                            <h4 className='fw-bold' style={{ color: "#bf578d" }}>Sass</h4>
                            <h1 className='fw-bold' style={{ color: "#7430f9" }}>Bootstrap</h1>
                            <h1 className='fw-bold' style={{ color: "#15b4c1" }}>tailwindcss</h1>
                        </div>
                    </div>
                </div>
            </header>
            {/* card section */}
            <div className='border border-primary border-2 mt-5'>
                <div className="row g-0 m-0">
                    <div className="col-md-4 col-sm-12">
                        <h1>Card 1</h1>
                        {/* <Text />  */}
                    </div>
                    <div className="col-md-4 col-sm-12">
                        <h1>Card 2</h1>
                    </div>
                    <div className="col-md-4 col-sm-12">
                        <h1>Card 2</h1>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeComponent;