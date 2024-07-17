import { MongoClient } from "mongodb";
import logger from "./logger";

let client: MongoClient | null = null; // Variable to hold the MongoClient instance

export async function connectToDb(): Promise<MongoClient> {
  if (!client) {
    client = await new MongoClient(process.env.MONGODB_URI ?? "").connect(); // Use nullish coalescing operator
    logger.success("Connected to MongoDB!");
  }
  return client;
}

export async function getDb(): Promise<import("mongodb").Db> {
  const connectedClient = await connectToDb();
  return connectedClient.db("test"); // Assuming 'test' is your database name
}
