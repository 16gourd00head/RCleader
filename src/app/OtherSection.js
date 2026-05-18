"use client";
import { useState } from "react";

export default function OtherSection({
  programs,
  selected,
  handleCheck,
  totalOtherTime
}) {
  const [open, setOpen] = useState(false);

  const filtered = programs.filter(
    (item) => item.type === "other"
  );

  return (
    <div>
      <h2
        style={{ cursor: "pointer" }}
        onClick={() => setOpen(!open)}
      >
        비교과 참여 시간 <span style={{color: totalOtherTime >= 10 ? "green" : "red"}}>{totalOtherTime}</span>/10시간
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
              {item.name} ({item.time}시간)
            </label>
          </div>
        ))}
    </div>
  );
}