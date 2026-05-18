"use client";

import { useState } from "react";
import HouseSection from "./HouseSection";
import LectureSection from "./LectureSection";
import OtherSection from "./OtherSection";

export default function ProgramList({ programs }) {
  const [selected, setSelected] = useState([]);

  const handleCheck = (id) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((v) => v !== id)
        : [...prev, id]
    );
  };

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

  return (
    <div>
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
    </div>
  );
}