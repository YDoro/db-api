import type { InsertDocumentRepository } from "../../../domain/repositories/insert-document";
import type { InsertDocumentUC } from "../../../domain/usecases/insert-document";
import { MongoInsertDocument } from "../../usecases/mongo-insert-document";

let uc: InsertDocumentUC;
export const makeInsertDocumentUC = (repo: InsertDocumentRepository): InsertDocumentUC => {
    if (!uc) {
        uc = new MongoInsertDocument(repo);
    }
    return uc;
};
