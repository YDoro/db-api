import type { FindDocumentsRepository } from "../../../domain/repositories/find-document";
import type { FindDocumentsUC } from "../../../domain/usecases/find-documents";
import { MongoFindDocument } from "../../usecases/mongo-find-document";

let uc: FindDocumentsUC;

export const makeFindDocumentUC = (repo: FindDocumentsRepository): FindDocumentsUC => {
    if (!uc) {
        uc = new MongoFindDocument(repo);
    }

    return uc;
};
