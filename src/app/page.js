import Image from "next/image";
import styles from "./page.module.css";
import clientPromise from "@/lib/mongodb";
import ProgramList from "./ProgramList";

export default async function Home() {
  const client = await clientPromise;
  const db = client.db("RCcal");

  const programs = await db.collection("programs").find({}).sort({ name: 1 }).toArray();

  return (
    <div>
     <ProgramList programs={JSON.parse(JSON.stringify(programs))} />
    </div>
  );
}
