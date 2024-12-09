import type { DocumentUpdater } from "..";
import type { Request } from "../../../presentation/interfaces/http";

export interface GetDocumentUpdaterFromRequestUC {
    getDocumentUpdaterFromRequest: (request: Request) => DocumentUpdater;
}
