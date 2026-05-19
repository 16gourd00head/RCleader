"use client";

import { useState } from "react";
import HouseSection from "./HouseSection";
import LectureSection from "./LectureSection";
import OtherSection from "./OtherSection";
import PESection from "./PESection";
import OTSection from "./OTSection";

export default function ProgramList({ programs }) {
  const [selected, setSelected] = useState([]);

  const handleCheck = (id) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((v) => v !== id)
        : [...prev, id]
    );
  };

  const PECount = programs.filter(
    (p) => p.type === "PE" && selected.includes(p._id)
  ).length;

  const OTCount = programs.filter(
    (p) => p.type === "OT" && selected.includes(p._id)
  ).length;

  const houseCount = programs.filter(
    (p) => p.type === "house" && selected.includes(p._id)
  ).length;

  const lectureCount = programs.filter(
    (p) => p.type === "lecture" && selected.includes(p._id)
  ).length;

  const otherTime = programs
    .filter((p) => p.type === "other" && selected.includes(p._id))
    .reduce((sum, cur) => sum + cur.time, 0);

  const houseExtra = houseCount > 1 ? (houseCount - 1) * 2 : 0;
  const lectureExtra = lectureCount > 2 ? lectureCount - 2 : 0;

  const totalOtherTime = otherTime + houseExtra + lectureExtra;

  const [CulSptCount, setCulSptCount] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;

    if (/^\d*$/.test(value) && Number(value) <= 10) {
      setCulSptCount(value);
    }
  };

  return (
    <div>
      <PESection
        programs={programs}
        selected={selected}
        handleCheck={handleCheck}
        PECount={PECount}
      />

      <OTSection
        programs={programs}
        selected={selected}
        handleCheck={handleCheck}
        OTCount={OTCount > 1 ? 1 : OTCount}
      />

      <HouseSection
        programs={programs}
        selected={selected}
        handleCheck={handleCheck}
        houseCount={houseCount}
      />

      <LectureSection
        programs={programs}
        selected={selected}
        handleCheck={handleCheck}
        lectureCount={lectureCount}
      />

      <OtherSection
        programs={programs}
        selected={selected}
        handleCheck={handleCheck}
        totalOtherTime={totalOtherTime}
      />

      <h2>
        RC문화체육 참여{" "}
        <input
          type="text"
          value={CulSptCount}
          onChange={handleChange}
          style={{
            border: "none",
            outline: "1px solid",
            background: "transparent",
            width: "30px",
            font: "inherit",
            margin: "0 5px",
            borderRadius: "4px",
            textAlign: "center",
            color: Number(CulSptCount) >= 7 ? "green" : "red",
          }}
        />
        /10회
      </h2>
    </div>
  );
}