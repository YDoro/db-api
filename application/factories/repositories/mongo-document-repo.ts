import type { Db } from "mongodb";
import { MongoDocumentRepository } from "../../repositories/document";

let repo: MongoDocumentRepository;
export const makeDocumentRepo = (db: Db): MongoDocumentRepository => {
    if (!repo) {
        repo = new MongoDocumentRepository(db);
    }

    return repo;
};
