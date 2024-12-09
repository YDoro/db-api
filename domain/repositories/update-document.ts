import type { DocumentUpdater } from "../entities/document";

export interface UpdateDocumentRepository {
    UpdateDocument: (document: DocumentUpdater) => Promise<string>;
}
