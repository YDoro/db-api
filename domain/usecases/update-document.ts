import type { DocumentUpdater } from "../entities/document";

export interface UpdateDocumentUC {
    Update: (document: DocumentUpdater) => Promise<string>;
}
