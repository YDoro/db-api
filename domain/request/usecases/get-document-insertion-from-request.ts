import type { DocumentInsertion } from "..";
import type { Request } from "../../../presentation/interfaces/http";

export interface GetDocumentInsertionFromRequestUC {
    getDocumentInsertionFromRequest: (request: Request) => DocumentInsertion;
}
