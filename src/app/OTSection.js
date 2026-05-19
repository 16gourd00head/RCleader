"use client";
import { useState } from "react";

export default function OTSection({
  programs,
  selected,
  handleCheck,
  OTCount,
}) {
  const [open, setOpen] = useState(false);

  const filtered = programs.filter(
    (item) => item.type === "OT"
  );

  return (
    <div>
      <h2
        style={{ cursor: "pointer" }}
        onClick={() => setOpen(!open)}
      >
        하우스 오리엔테이션 <span style={{color: OTCount >= 1 ? "green" : "red"}}>{OTCount}</span>/1회
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