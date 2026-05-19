"use client";
import { useState } from "react";

export default function PESection({
  programs,
  selected,
  handleCheck,
  PECount,
}) {
  const [open, setOpen] = useState(false);

  const filtered = programs.filter(
    (item) => item.type === "PE"
  );

  return (
    <div>
      <h2
        style={{ cursor: "pointer" }}
        onClick={() => setOpen(!open)}
      >
        RC단체활동 <span style={{color: PECount >= 1 ? "green" : "red"}}>{PECount}</span>/1회
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