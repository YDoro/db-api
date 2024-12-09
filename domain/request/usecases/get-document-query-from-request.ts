import type { DocumentQuery } from "..";
import type { Request } from "../../../presentation/interfaces/http";

export interface GetDocumentQueryFromRequestUC {
    getDocumentQueryFromRequest: (request: Request) => DocumentQuery;
}
