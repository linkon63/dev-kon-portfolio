import React from 'react';
import Footer from '../Shared/Footer/Footer';
import HeaderNav from '../Shared/HeaderNav/HeaderNav';
import ResumeMain from './ResumeMain';

const Resume = () => {
    return (
        <div>
            <HeaderNav></HeaderNav>
            <ResumeMain></ResumeMain>
            <Footer></Footer>
        </div>
    );
};

export default Resume;