import type { DocumentUpdater } from "../../domain/entities/document";
import type { UpdateDocumentRepository } from "../../domain/repositories/update-document";
import type { UpdateDocumentUC } from "../../domain/usecases/update-document";

export class MongoUpdateDocument implements UpdateDocumentUC {
    constructor(private readonly docRepo: UpdateDocumentRepository) {}
    Update = async (document: DocumentUpdater): Promise<string> => {
        if (Object.keys(document?.filter).length) {
            return await this.docRepo.UpdateDocument(document);
        }
        return ""; // TODO - throw ApplicationError - massive updates are not allowed
    };
}
