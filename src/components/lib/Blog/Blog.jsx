import React from "react";
import Layout from "../Layout/Layout";

export default function Blog() {
  return <Layout key={Math.random() + ""} props={<div className="text-lg fw-bold text-white">Soon !</div>} />;
}
