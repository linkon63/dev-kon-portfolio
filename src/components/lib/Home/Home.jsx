import React from 'react';
import Layout from '../Layout/Layout';
import HomeComponent from './HomeComponent';

const Home = () => {
    return (
        <Layout key={Math.random() + ""} props={<HomeComponent key={Math.random() + ""} />} />
    );
};

export default Home;