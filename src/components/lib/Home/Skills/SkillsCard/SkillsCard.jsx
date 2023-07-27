import React from "react";
export default function SkillsCard({ icons, title }) {
  return (
    <div className="col-md-3 ">
      <div className="bg-white text-dark d-flex skill-icon p-2 m-1">
        {icons}
        <h5>{title}</h5>
      </div>
    </div>
  );
}
