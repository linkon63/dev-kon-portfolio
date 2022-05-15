import React from 'react';
// dom
import { BrowserRouter, Route, Routes } from "react-router-dom";
// library
// -------
// components
import Navbar from './Components/Sheared/Navbar/Navbar';
import Home from './Components/Pages/Home/Home';
import About from './Components/Pages/About/About';
import Blog from './Components/Pages/Blog/Blog';
import Contact from './Components/Pages/Contact/Contact';
import Resume from './Components/Pages/Resume/Resume';
import Footer from './Components/Sheared/Footer/Footer';

// style
// ---

// client db connection

// initialization
// -----
function App() {
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="blog" element={<Blog />} />
        <Route path="contact" element={<Contact />} />
        <Route path="resume" element={<Resume />} />
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
  );
};

export default App;
