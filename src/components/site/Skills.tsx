import SkillsCard from "./SkillsCard";
import { mySkills } from "@/data/skills";

export default function Skills() {
  return (
    <div className="flex flex-wrap">
      {mySkills.map((skill) => (
        <SkillsCard key={skill.id} title={skill.title} icons={skill.icon} />
      ))}
    </div>
  );
}
