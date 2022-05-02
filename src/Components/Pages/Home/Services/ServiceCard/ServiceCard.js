import React from 'react';
import AdbIcon from '@mui/icons-material/Adb';

const ServiceCard = () => {
    return (
        <div style={{background: '#111'}} className='mb-3 rounded-2'>
            <div className='py-3 px-4'>
                <div className="row">
                    <div className="col-10 text-white">
                        <h4 className='fw-bold text-capitalize'>
                            props.title
                        </h4>
                        <p style={{color: '#ddd'}}>
                            props.details
                        </p>
                        <a className='text-white text-capitalize decoration-none' href="/">
                            projects
                        </a>
                    </div>
                    <div style={{color: '#64F4AB'}} className="col-2">
                        <AdbIcon/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;