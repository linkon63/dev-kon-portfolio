import React from 'react';
import { useSpring, animated } from 'react-spring';
// import { useSpring, animated } from 'react-spring';
// import nodeImage from '../../assests/nodejs_logo.png'
import './HomeComponent.css'
const HomeComponent = () => {
    const styles = useSpring({
        loop: true,
        to: [
            { opacity: 3, color: '#5ed3f3' },
            { opacity: 2, color: '#8bc500' },
            { opacity: 1, color: '#146cad' },
            { opacity: 0, color: '#00e962' },
            { opacity: 3, color: '#5ed3f3' },
            { opacity: 2, color: '#8bc500' },
            { opacity: 1, color: '#146cad' },
            { opacity: 0, color: '#00e962' },
        ],
        from: { opacity: 0, color: '#8bc500' },
        delay: 1000
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
                <div className="col-md-6 col-sm-12">
                    {/* animation */}
                    <div className='text-center'>
                        <animated.div style={styles}>
                            <h3 className='text-uppercase'>Technologies you need</h3>
                        </animated.div>
                    </div>
                    {/* bg-warning d-flex justify-content-end align-items-end */}
                    <div className=''>
                        <h1 className='fw-bold text-warning'>JS</h1>
                        <h1 className='fw-bold' style={{ color: "#8bc500" }}>Node</h1>
                        <h3 className='fw-bold' style={{ color: "#5ed3f3" }}>React</h3>
                        <h4 className=''>Express <span className='text-warning fw-bold'>JS</span></h4>
                        <h1 className='fw-bold' style={{ color: "#00e962" }}>mongoDB</h1>
                        <h1>HTML</h1>
                        <h3 className='fw-bold' style={{ color: "#146cad" }}>CSS3</h3>
                        <h4 className='fw-bold' style={{ color: "#bf578d" }}>Sass</h4>
                        <h1 className='fw-bold' style={{ color: "#7430f9" }}>Bootstrap</h1>
                        <h1 className='fw-bold' style={{ color: "#15b4c1" }}>tailwindcss</h1>
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