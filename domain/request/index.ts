import type { Document } from "mongodb";

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
