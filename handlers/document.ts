import { MongoClient } from "mongodb";
import mongoInsertTranslator from "../data/utils/mongo-insert-translator";
import mongoReadTranslator from "../data/utils/mongo-read-translator";
import type { Request, Response } from "../interfaces/presentation";

const client = new MongoClient(process.env.DB_CONNECTION_STING || "")

export const HandleDocumentRead = async (req: Request): Promise<Response> => {
    const q = mongoReadTranslator(req)

    const col = client.db("everything").collection(q.collection)
    
    const res = await (col.aggregate(q.pipeline).toArray())

    if (res.length === 0){
        return { status: 204, data: res }
    }

    return { status: 200, data: res }
}


export const HandleDocumentCreation = async (req: Request): Promise<Response> => {
    const data = mongoInsertTranslator(req)
    const col = client.db("everything").collection(data.collection)
    const res = await col.insertOne(data.document)

    return { status: 200, data: { message: res.insertedId } }

}