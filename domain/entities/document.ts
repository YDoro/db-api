export interface Document {
    [key: string]: any;
}
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
