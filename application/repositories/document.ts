import type { Db, InsertOneResult, WithId } from "mongodb";
import type { Document, DocumentInsertion, DocumentQuery } from "../../domain/entities/document";
import type { FindDocumentsRepository } from "../../domain/repositories/find-document";
import type { InsertDocumentRepository } from "../../domain/repositories/insert-document";

export class MongoDocumentRepository implements FindDocumentsRepository, InsertDocumentRepository {
    constructor(private readonly db: Db) {}

    FindDocuments = async (query: DocumentQuery): Promise<any> => {
        return await this.db.collection(query.collection).aggregate(query.pipeline).toArray();
    };

    InsertDocument = async (insert: DocumentInsertion): Promise<string> => {
        return (await this.db.collection(insert.collection).insertOne(insert.document)).insertedId.toString();
    };

    InsertSubDocument = async (insert: DocumentInsertion): Promise<string> => {
        return (
            (
                await this.db
                    .collection(insert.collection)
                    .findOneAndUpdate(insert.filter, insert.document, { arrayFilters: insert.arrayFilters })
            )?._id.toString() || ""
        );
    };
}
