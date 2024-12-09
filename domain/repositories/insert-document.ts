import type { DocumentInsertion } from "../entities/document";

export interface InsertDocumentRepository {
    InsertDocument: (document: DocumentInsertion) => Promise<string>;
    InsertSubDocument: (document: DocumentInsertion) => Promise<string>;
}
