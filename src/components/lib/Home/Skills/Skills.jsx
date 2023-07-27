import React from "react";
import { FaReact, FaHtml5, FaGitSquare, FaCss3Alt } from "react-icons/fa";
import SkillsCard from "./SkillsCard/SkillsCard";
import { mySkills } from "../../../database/skillsdb";

export default function Skills() {
  return (
    <div className="d-flex align-items-center justify-content-center">
      {/* <h1>Skills</h1> */}
      <div className="row">
        {mySkills.map((skill) => (
          <SkillsCard
            key={Math.random() + ""}
            title={skill.title}
            icons={skill.icon}
          />
        ))}
      </div>
      {/* <SkillsCard key={Math.random() + ""} title="react" icons={<FaReact />} />
      <SkillsCard key={Math.random() + ""} title="css" icons={<FaCss3Alt />} /> */}
    </div>
  );
}
