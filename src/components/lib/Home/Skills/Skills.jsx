import React from "react";
import { FaReact, FaHtml5, FaGitSquare, FaCss3Alt } from "react-icons/fa";
import SkillsCard from "./SkillsCard/SkillsCard";
import { mySkills } from "../../../database/skillsdb";

export default function Skills() {
  return (
    <div className="row">
      {mySkills.map((skill) => (
        <SkillsCard
          key={Math.random() + ""}
          title={skill.title}
          icons={skill.icon}
        />
      ))}
    </div>
  );
}
