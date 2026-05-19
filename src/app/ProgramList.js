"use client";

import { useState } from "react";
import HouseSection from "./HouseSection";
import LectureSection from "./LectureSection";
import OtherSection from "./OtherSection";
import PESection from "./PESection";
import OTSection from "./OTSection";
import GradeGauge from "./GradeGauge.js";

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

  const OTVaild = OTCount > 1 ? 1 : OTCount;
  const houseVaild = houseCount > 1 ? 1 : houseCount;
  const lectureVaild = lectureCount > 2 ? 2 : lectureCount;
  const houseExtra = houseCount > 1 ? (houseCount - 1) * 2 : 0;
  const lectureExtra = lectureCount > 2 ? lectureCount - 2 : 0;

  const totalOtherTime = otherTime + houseExtra + lectureExtra;
  const totalOtherTimeVaild = totalOtherTime > 10 ? 10 : totalOtherTime;

  const [CulSptCount, setCulSptCount] = useState("");

  const [MeetingTime, setMeetingTime] = useState("");
  
  const handleCulChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && Number(value) <= 10) {
        setCulSptCount(value);
    }
  };

  const handleMeetingChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && Number(value) <= 10) {
      setMeetingTime(value);
    }
  };
  const score = CulSptCount * 3 + Number(MeetingTime) * 2 + OTVaild * 5 + (totalOtherTime > 10 ? 10 : totalOtherTime)*2 + (lectureCount > 2 ? 2 : lectureCount)*5 + PECount * 5 + houseVaild * 10;
  const time = PECount * 5 + totalOtherTimeVaild + lectureVaild + OTVaild + houseVaild * 2 + Number(MeetingTime)
  const getGradeInfo = (score) => {
  if (Number(CulSptCount) < 7 || time < 20)
    return { grade: "F", color: "#d32f2f" };

  if (score >= 92) return { grade: "A+", color: "#2e7d32" };
  if (score >= 88) return { grade: "A0", color: "#388e3c" };
  if (score >= 84) return { grade: "A-", color: "#66bb6a" };
  if (score >= 80) return { grade: "B+", color: "#1565c0" };
  if (score >= 76) return { grade: "B0", color: "#1976d2" };
  if (score >= 72) return { grade: "B-", color: "#64b5f6" };
  if (score >= 68) return { grade: "C+", color: "#ef6c00" };
  if (score >= 64) return { grade: "C0", color: "#fb8c00" };
  if (score >= 60) return { grade: "C-", color: "#ffb74d" };
  if (score >= 56) return { grade: "D+", color: "#6a1b9a" };
  if (score >= 52) return { grade: "D0", color: "#8e24aa" };
  if (score >= 48) return { grade: "D-", color: "#ba68c8" };

  return { grade: "F", color: "#d32f2f" };
};
  const { grade, color } = getGradeInfo(score);

  return (
    <div>
      <GradeGauge score={score} grade={grade} color={color} />

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
        OTCount={OTVaild}
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
        RC문화체육활동{" "}
        <input
          type="text"
          value={CulSptCount}
          onChange={handleCulChange}
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
        /10회 <span style={{color: Number(CulSptCount) >= 7 ? "green" : "red"}}>{Number(CulSptCount) >= 7 ? "P" : "NP"}</span>
      </h2>
      <h2>
        하우스 분반활동{" "}
        <input
          type="text"
          value={MeetingTime}
          onChange={handleMeetingChange}
          style={{
            border: "none",
            outline: "1px solid",
            background: "transparent",
            width: "30px",
            font: "inherit",
            margin: "0 5px",
            borderRadius: "4px",
            textAlign: "center",
            color: "black",
          }}
        />
        /10시간
      </h2>
    </div>
  );
}