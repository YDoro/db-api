import { makeDocumentRepo } from "../application/factories/repositories/mongo-document-repo";
import { makeFindDocumentUC } from "../application/factories/usecases/find-document-uc";
import { MongoRequestToDocumentInsertionMapper } from "../application/mappers/mongo-request-to-document-insertion-mapper";
import { MongoRequestToDocumentQueryMapper } from "../application/mappers/mongo-request-to-document-query-mapper";
import { MongoRequestToDocumentUpdaterMapper } from "../application/mappers/mongo-request-to-document-updater-mapper";
import { MongoDocumentRepository } from "../application/repositories/document";
import { MongoFindDocument } from "../application/usecases/mongo-find-document";
import { clearCollectionRelatedCache, setCacheForRequest } from "../infra/config/cache";
import { getDatabase } from "../infra/config/database";
import type { Request, Response } from "../presentation/interfaces/http";

export const HandleDocumentRead = async (req: Request): Promise<Response> => {
    const q = MongoRequestToDocumentQueryMapper(req);
    const db = await getDatabase(); // in future we can change database based on requesting user if needed
    const uc = makeFindDocumentUC(makeDocumentRepo(db));

    const res = await uc.Find(q);

    if (res.length === 0) {
        return { status: 204, data: res };
    }

    await setCacheForRequest(req, { status: 200, data: res });
    return { status: 200, data: res };
};

export const HandleDocumentCreation = async (req: Request): Promise<Response> => {
    const data = MongoRequestToDocumentInsertionMapper(req); //TODO - use interface based dependency
    const col = (await getDatabase()).collection(data.collection);

    if (!data.isSubDocumentInsertion) {
        const res = await col.insertOne(data.document);
        clearCollectionRelatedCache(data.collection);
        return { status: 200, data: { id: res.insertedId } };
    }

    if (Object.keys(data?.filter).length) {
        clearCollectionRelatedCache(data.collection);
        const res = await col.findOneAndUpdate(data.filter, data.document, { arrayFilters: data.arrayFilters });
        return { status: 200, data: { id: res?._id } };
    }

    // TODO check this case
    return { status: 400, data: { message: "no massive updates allowed" } };
};

export const HandleDocumentUpdate = async (req: Request): Promise<Response> => {
    const data = MongoRequestToDocumentUpdaterMapper(req); //TODO - use interface based dependency
    const col = (await getDatabase()).collection(data.collection);

    if (Object.keys(data?.filter).length) {
        clearCollectionRelatedCache(data.collection);
        const res = await col.findOneAndUpdate(data.filter, data.document, { arrayFilters: data.arrayFilters });
        return { status: 200, data: { id: res?._id } };
    }

    return { status: 400, data: { message: "invalid input" } };
};
