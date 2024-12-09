import type { DocumentInsertion } from "../entities/document";

export interface InsertDocumentUC {
    Insert: (document: DocumentInsertion) => Promise<string>;
}
