import type { UpdateDocumentRepository } from "../../../domain/repositories/update-document";
import type { UpdateDocumentUC } from "../../../domain/usecases/update-document";
import { MongoUpdateDocument } from "../../usecases/mongo-update-document";

let uc: UpdateDocumentUC;
export const makeUpdateDocumentUC = (repo: UpdateDocumentRepository): UpdateDocumentUC => {
    if (!uc) {
        uc = new MongoUpdateDocument(repo);
    }
    return uc;
};
