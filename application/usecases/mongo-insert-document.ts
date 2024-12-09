import type { DocumentInsertion } from "../../domain/entities/document";
import type { InsertDocumentRepository } from "../../domain/repositories/insert-document";
import type { InsertDocumentUC } from "../../domain/usecases/insert-document";

export class MongoInsertDocument implements InsertDocumentUC {
    constructor(private readonly docRepo: InsertDocumentRepository) {}
    Insert = async (document: DocumentInsertion): Promise<string> => {
        if (!document.isSubDocumentInsertion) {
            return await this.docRepo.InsertDocument(document);
        }

        if (Object.keys(document?.filter).length) {
            return await this.docRepo.InsertSubDocument(document);
        }

        return ""; // TODO - throw ApplicationError - massive updates are not allowed - and create a middleware to handle httpStatus based on application errors
    };
}
