import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Home/Home";
import About from "../About/About";
import Project from "../Project/Project";
import Layout from "../Layout/Layout";
import HomeComponent from "../Home/HomeComponent";
import Dashboard from "../../admin/dashboard/Dashboard";
import AllProject from "../Project/AllProject/AllProject";
import Resume from "../Resume/Resume";
import Contact from "../Contact/Contact";
import Blog from "../Blog/Blog";
const RootRouter = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout
            key={Math.random() + ""}
            props={<HomeComponent key={Math.random() + ""} />}
          />
        }
      />
      <Route path="/home" element={<Home key={Math.random() + ""} />} />
      <Route path="/about" element={<About key={Math.random() + ""} />} />
      <Route
        path="/projects"
        element={
          <Layout
            key={Math.random() + ""}
            props={<Project key={Math.random() + ""} />}
          />
        }
      />
      <Route
        path="/allProject"
        element={<AllProject key={Math.random() + ""} />}
      />
      <Route path="/resume" element={<Resume key={Math.random() + ""} />} />
      <Route path="/resume" element={<Resume key={Math.random() + ""} />} />
      <Route path="/contact" element={<Contact key={Math.random() + ""} />} />
      <Route path="/blogs" element={<Blog key={Math.random() + ""} />} />

      <Route
        path="/dashboard"
        element={<Dashboard key={Math.random() + ""} />}
      />
    </Routes>
  );
};

export default RootRouter;
