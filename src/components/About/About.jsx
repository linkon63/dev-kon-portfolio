import React from 'react';
import Footer from '../Shared/Footer/Footer';
import HeaderNav from '../Shared/HeaderNav/HeaderNav';
import AboutMain from './AboutMain';

const About = () => {
    return (
        <div>
            <HeaderNav></HeaderNav>
            <AboutMain></AboutMain>
            <Footer></Footer>
        </div>
    );
};

export default About;