import React from 'react';
import TopNavbar from '../Shared/Navbar/TopNavbar';

const Layout = ({ props }) => {
    return (
        <div>
            <TopNavbar />
            <div className=''>
                {props}
            </div>
        </div>
    );
};

export default Layout;