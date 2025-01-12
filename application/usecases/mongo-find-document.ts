import type { Db } from "mongodb";
import type { DocumentQuery } from "../../domain/entities/document";
import type { FindDocumentsRepository } from "../../domain/repositories/find-document";
import type { FindDocumentsUC } from "../../domain/usecases/find-documents";

export class MongoFindDocument implements FindDocumentsUC {
    constructor(private readonly docRepo: FindDocumentsRepository) {}

    Find = async (query: DocumentQuery): Promise<any> => {
        return await this.docRepo.FindDocuments(query);
    };
}
