import React from 'react';
import HeaderNav from '../Shared/HeaderNav/HeaderNav';
import AboutMeSection from './AboutMeSection';
import HomeMain from './HomeMain';
import Footer from '../Shared/Footer/Footer'
import MyProjects from './MyProjects';
import { Spring } from '@react-spring/core';
import HookedComponent from './StyleComp/HookedComponent';
import Skill from './StyleComp/Skill';

const Home = () => {
    return (
        <div>
                   <HeaderNav></HeaderNav>
                    <HomeMain></HomeMain>
                    <MyProjects></MyProjects>
                    <Skill></Skill>
                    <AboutMeSection></AboutMeSection>
                    <Footer></Footer>
        </div>
    );
};

export default Home;