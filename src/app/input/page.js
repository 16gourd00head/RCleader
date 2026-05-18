import clientPromise from "@/lib/mongodb";

export default function InputPage() {

  async function createProgram(formData) {
    "use server"; // ⭐ 서버 액션

    const name = formData.get("name");
    const time = Number(formData.get("time"));
    const type = formData.get("type");

    const client = await clientPromise;
    const db = client.db("RCcal");

    await db.collection("programs").insertOne({
      name,
      time,
      type,
    });
  }

  return (
    <div>
      <h1>프로그램 입력</h1>

      <form action={createProgram}>
        <input name="name" placeholder="이름" required />
        <input name="time" type="number" placeholder="시간" required />
        <input name="type" placeholder="타입" required />

        <button type="submit">저장</button>
      </form>
    </div>
  );
}