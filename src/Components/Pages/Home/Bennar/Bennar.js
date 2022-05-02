import React from 'react';

const Bennar = () => {
    return (
        <div style={{background: "#2D2E32"}}>
            <div className="container">
                <div className="row pt-5 d-flex justify-content-center align-items-center">
                    <div className="col-md-5 d-flex justify-content-center align-items-center lh-lg">
                        <div>
                            <h4 style={{ background: '#64F4AB' }} className='lh-lg py-1 px-2 text-capitalize rounded text-dark fw-bold d-inline-block'>fornt End Developer</h4>
                            <h2 className='lh-lg text-white my-5 fs-1 text-capitalize'>talk is ceep show me the code</h2>
                            <p style={{ color: '#ddd' }} className='lh-lg fs-5 text-justify mb-4'>I design and code buitifully simple things. And I love what I do.</p>
                            <a style={{color: '#64F4AB'}} className="fs-3 text-uppercase lh-lg mt-2" href="">Let's Chat!</a>
                        </div>
                    </div>
                    <div className="col-md-7">
                        <img src="/img/linkon.png" alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Bennar;