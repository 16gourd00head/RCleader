"use client";
import { useState } from "react";

export default function LectureSection({
  programs,
  selected,
  handleCheck,
  lectureCount,
}) {
  const [open, setOpen] = useState(false);

  const filtered = programs.filter(
    (item) => item.type === "lecture"
  );

  return (
    <div>
      <h2
        style={{ cursor: "pointer" }}
        onClick={() => setOpen(!open)}
      >
        RC연세특강 <span style={{color: lectureCount >= 2 ? "green" : "red"}}>{lectureCount}</span>/2회
      </h2>

      {open &&
        filtered.map((item) => (
          <div key={item._id}>
            <label>
              <input
                type="checkbox"
                checked={selected.includes(item._id)}
                onChange={() => handleCheck(item._id)}
              />
              {item.name}
            </label>
          </div>
        ))}
    </div>
  );
}