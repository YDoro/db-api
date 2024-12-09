import { type Db, MongoClient } from "mongodb";

let client: MongoClient | null = null;

export const connect = async () => {
    client = new MongoClient(process.env.DB_CONNECTION_STING || "");
    client = await client.connect();
    return client;
};

export const getClient = async (): Promise<MongoClient> => {
    if (client) return client;
    client = await connect();

    return client;
};

export const getDatabase = async (): Promise<Db> => {
    return (await getClient()).db(process.env.DB_NAME || "everything");
};

export const closeConnection = async () => {
    await client?.close();
};
