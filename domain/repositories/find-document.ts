import type { DocumentQuery } from "../entities/document";

export interface FindDocumentsRepository {
    FindDocuments: (query: DocumentQuery) => Promise<any>;
}
