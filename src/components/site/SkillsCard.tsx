import type { ReactNode } from "react";

export default function SkillsCard({
  icons,
  title,
}: {
  icons: ReactNode;
  title: string;
}) {
  return (
    <div className="w-full md:w-1/4">
      <div className="skill-icon m-1 flex items-center bg-white p-2 text-black">
        {icons}
        <h5>{title}</h5>
      </div>
    </div>
  );
}
