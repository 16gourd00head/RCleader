"use client";
import { useState } from "react";

export default function HouseSection({
  programs,
  selected,
  handleCheck,
  houseCount,
}) {
  const [open, setOpen] = useState(false);

  const filtered = programs.filter(
    (item) => item.type === "house"
  );

  return (
    <div>
      <h2
        style={{ cursor: "pointer" }}
        onClick={() => setOpen(!open)}
      >
        하우스 프로그램 <span style={{color: houseCount >= 1 ? "green" : "red"}}>{houseCount}</span>/1
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