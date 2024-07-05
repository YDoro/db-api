import { inspect } from "bun";
import { MongoClient } from "mongodb";
import mongoInsertTranslator from "../data/utils/mongo-insert-translator";
import mongoReadTranslator from "../data/utils/mongo-read-translator";
import mongoUpdateTranslator from "../data/utils/mongo-update-translator";
import type { Request, Response } from "../presentation/interfaces/http";

const client = new MongoClient(process.env.DB_CONNECTION_STING || "")

export const HandleDocumentRead = async (req: Request): Promise<Response> => {
    const q = mongoReadTranslator(req)

    const col = client.db("everything").collection(q.collection)

    const res = await (col.aggregate(q.pipeline).toArray())

    if (res.length === 0) {
        return { status: 204, data: res }
    }

    return { status: 200, data: res }
}

export const HandleDocumentCreation = async (req: Request): Promise<Response> => {
    const data = mongoInsertTranslator(req)
    const col = client.db("everything").collection(data.collection)
    
    if (!data.isSubDocumentInsertion) {
        const res = await col.insertOne(data.document)
        return { status: 200, data: { id: res.insertedId } }
    }
    
    if (Object.keys(data?.filter).length) {
        const res = await col.findOneAndUpdate(data.filter, data.document, { arrayFilters: data.arrayFilters })
        return { status: 200, data: { id: res?._id } }
    }

    // TODO check this case
    return { status: 400, data: { message: "no massive updates allowed" } }
}

export const HandleDocumentUpdate = async (req: Request): Promise<Response> => {
    const data = mongoUpdateTranslator(req)
    const col = client.db("everything").collection(data.collection)
    console.log(inspect(data));

    if (Object.keys(data?.filter).length) {
        const res = await col.findOneAndUpdate(data.filter, data.document, { arrayFilters: data.arrayFilters })
        return { status: 200, data: { id: res?._id } }
    }

    return { status: 400, data: { message: "invalid input" } }
}