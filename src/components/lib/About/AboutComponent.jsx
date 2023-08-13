import React from "react";
import profileImage from "../../assests/profileimage.jpg";
const AboutComponent = () => {
  return (
    <div className="row">
      <div className="col-md-7 text-center font-large blockquote">
        Experienced with{" "}
        <span className="fw-bold p-1 bg-white text-dark blockquote">
          Software Engineering
        </span>
        , Skilled in {" < --"}Web Applications {" -- >"}, Front-End Development,
        Back-End Development, and Database(SQL, NoSQL) Specialize in{" "}
        <span className="fw-bold p-1 bg-white text-dark blockquote">
          MERN & LAMP
        </span>{" "}
        Stack and Web Security. Strong engineering professional, focused on
        Computer Science. - Quick Learner, proactive, and has strong work ethics
        Group Management and Problem-Solver with problem-solving skills.
        <br />
        <a
          href="https://github.com/linkon63"
          className="fw-bold p-1 bg-white text-dark blockquote"
        >
          GitHub: https://github.com/linkon63
        </a>
        <br />
        <button className="btn ps-4 pe-4 bg-white fw-bold mt-5">
          Email Me &#128397;
        </button>
      </div>
      <div className="col-md-4">
        <img src={profileImage} alt="profile" width={"100%"} />
      </div>
    </div>
  );
};

export default AboutComponent;
