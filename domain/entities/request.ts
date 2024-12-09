import type { Document } from "mongodb"; // TODO - make it generic

export type DocumentInsertion = {
    collection: string;
    isSubDocumentInsertion: boolean;
    document: any;
    filter: Document;
    arrayFilters: any[];
};

export type DocumentQuery = {
    collection: string;
    pipeline?: any[];
};

export type DocumentUpdater = Omit<DocumentInsertion, "isSubDocumentInsertion"> & {
    isSubDocumentUpdate: boolean;
};
