import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Home/Home";
import About from "../About/About";

const RootRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home key={Math.random() + ""} />} />
      <Route path="/home" element={<Home key={Math.random() + ""} />} />
      <Route path="/about" element={<About key={Math.random() + ""} />} />
    </Routes>
  );
};

export default RootRouter;
