import React from "react";
import ownResume from "../../files/Resume V12.pdf";
import { Link } from "react-router-dom";
export default function Resume() {
  return (
    <div className="bg-dark">
      <div className="row">
        <div className="col-md-2">
          <div className="container text-center mt-5 mt-5 pt-5">
            <p>Welcome to me</p>
            <Link to="/home" className="text-white text-lg">
              /home
            </Link>
          </div>
        </div>
        <div className="col-md-10">
          <object
            data={ownResume}
            type="application/pdf"
            width="100%"
            height="1000px"
          >
            <p>
              Unable to display PDF file. <a href={ownResume}>Download</a>{" "}
              instead.
            </p>
          </object>
        </div>
      </div>
    </div>
  );
}
