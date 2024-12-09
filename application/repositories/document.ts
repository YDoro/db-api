import type { Db } from "mongodb";
import type { DocumentQuery } from "../../domain/entities/document";
import type { FindDocumentsRepository } from "../../domain/repositories/find-document";

export class MongoDocumentRepository implements FindDocumentsRepository {
    constructor(private readonly db: Db) {}

    FindDocuments = async (query: DocumentQuery): Promise<any> => {
        return await this.db.collection(query.collection).aggregate(query.pipeline).toArray();
    };
}
