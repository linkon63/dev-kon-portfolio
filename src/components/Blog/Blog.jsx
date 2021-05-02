import React from 'react';
import Footer from '../Shared/Footer/Footer';
import HeaderNav from '../Shared/HeaderNav/HeaderNav';
import BlogMain from './BlogMain';

const Blog = () => {
    return (
        <div>
            <HeaderNav></HeaderNav>
            <BlogMain></BlogMain>
            <Footer></Footer>
        </div>
    );
};

export default Blog;