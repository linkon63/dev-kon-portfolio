import React from 'react';
import Layout from '../Layout/Layout';
import AboutComponent from './AboutComponent';

const About = () => {
    return (
        <Layout key={Math.random()} props={<AboutComponent />} />
    );
};

export default About;