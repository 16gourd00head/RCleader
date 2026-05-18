import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

if (!uri) {
  throw new Error("MONGODB_URI가 정의되지 않았습니다.");
}

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
     console.log("새 MongoDB 클라이언트 연결이 생성되었습니다.");
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
    clientPromise = client.connect();
    console.log("새 MongoDB 클라이언트 연결이 생성되었습니다.");
}

export default clientPromise;