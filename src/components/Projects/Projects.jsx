import React from 'react';
import Footer from '../Shared/Footer/Footer';
import HeaderNav from '../Shared/HeaderNav/HeaderNav';
import ProjectsMain from './ProjectsMain';

const Projects = () => {
    return (
        <div>
            <HeaderNav></HeaderNav>
            <ProjectsMain></ProjectsMain>
            <Footer></Footer>
        </div>
    );
};

export default Projects;