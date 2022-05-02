import React from 'react';
import ServiceAbout from './ServiceAbout/ServiceAbout';
import ServiceCard from './ServiceCard/ServiceCard';

const Services = () => {
    return (
        <div>
            <div style={{background: '#000'}} className="py-5">
                <div className="container">
                    <div className="div py-5">
                        <div className="row">
                            <div className="col-md-6">
                                <div className='py-2 px-3 me-3'>
                                    <div>
                                        <ServiceCard></ServiceCard>
                                        <ServiceCard></ServiceCard>
                                        <ServiceCard></ServiceCard>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className='py-2 px-3 ms-3'>
                                    <ServiceAbout></ServiceAbout>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Services;