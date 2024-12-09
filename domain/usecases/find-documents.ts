import type { DocumentQuery } from "../entities/document";

export interface FindDocumentsUC {
    Find: (query: DocumentQuery) => Promise<any>;
}
